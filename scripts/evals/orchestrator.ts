import "./load-env.js";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod.mjs";
import z from "zod";
import testCasesJson from "./test-cases.json";
import { graderSystem } from "./prompts";
import { formats } from "@/lib/db/formats";
import { testBusiness} from "./types";
import { mainFunction, creativeBrief } from "@/lib/suggestions/generate-brief";
import { writeFile } from "fs/promises";




const client = new Anthropic();

const gradeOutputObject = z.object({
    reason: z.string(),
    valueNaturalSpanish: z.int().max(5).min(1),
    valuePlainWriting: z.int().max(5).min(1),
    valueCaptionQuality: z.int().max(5).min(1),
    valueFormatGoalFit: z.int().max(5).min(1),
    valueDishesAndSpecials: z.int().max(5).min(1),
    
})





// build runner flow
    // it picks 2-3 formats per business (so it needs format data)
    // and calls mainFunction with them
    // then code checks
    // and model grader (model with prompt to grade each output)

async function outputModelGrader(outputResult: string, testCase: string, format: string){ 
    
    const grade = await client.messages.parse({
        max_tokens: 16000,
        model: "claude-opus-5-5",
        system: graderSystem,

        messages: [{
            role: "user",
            content: `
                BUSINESS:  ${testCase}\n
                FORMAT: ${format} \n
                Output to test: ${outputResult}\n
            `,
        }],
        output_config: { format: zodOutputFormat(gradeOutputObject)}
    });
    const gradeData = grade.parsed_output;

    return gradeData;
}

function codeGrader(brief: z.infer<typeof creativeBrief>){

    // finds every **something** in the caption
    const boldMatches = brief.caption.match(/\*\*(.+?)\*\*/g) ?? [];
    const boldGrade = (boldMatches.length >= 1 && boldMatches.length <= 3) ? 
    2.5 
    : 0;
    
    const withoutBold = brief.caption.replace(/\*\*(.+?)\*\*/g, "");
    const strayAsteriskGrade = withoutBold.includes("*") ? 0 : 2.5;
    
    return boldGrade + strayAsteriskGrade;
}





async function mainGradingFunction(){

    const testCases = z.array(testBusiness).parse(testCasesJson).slice(0,1);
    const results = [];
    for(const [index, testCase] of testCases.entries()){
        
        const eligible = formats.filter(format => format.goalTags.includes(testCase.goal) ||format.goalTags.length == 0);
        for(let k = 0; k <= 0; k++){
            const format  = eligible[(index + k) % eligible.length];
            
            try{
                
                const response = await mainFunction(format.id, testCase);
                if(!response.parsed_output){
                    throw new Error("No response output contents!");
                }

                const codeGrade = codeGrader(response.parsed_output);
                const modelGrade = await outputModelGrader(
                    JSON.stringify(response.parsed_output, null, 2), 
                    JSON.stringify(testCase, null, 2), 
                    JSON.stringify(format, null, 2)
                );

                const reason = modelGrade?.reason;
                const spanishGrade = modelGrade?.valueNaturalSpanish;
                const plainWriteGrade = modelGrade?.valuePlainWriting;
                const goalGrade = modelGrade?.valueFormatGoalFit;
                const captionGrade = modelGrade?.valueCaptionQuality;
                const dsGrade = modelGrade?.valueDishesAndSpecials;

                if(!(reason && spanishGrade && plainWriteGrade && goalGrade && captionGrade && dsGrade)){
                    throw new Error("Missing grading values");
                }

                
                const result = {
                    testCase: testCase,
                    format: format,
                    reason: reason,
                    grades: {
                        spanishGrade: spanishGrade,
                        plainWriteGrade: plainWriteGrade,
                        goalGrade: goalGrade,
                        captionGrade: captionGrade,
                        dsGrade: dsGrade,
                        codeGrade: codeGrade,
                    },
                    brief: response.parsed_output,
                }

                results.push(result)


            }catch(err){
                console.error(err);
                const result = {testCase, format, error: String(err)};

                results.push(result);

                
            }

            


        }
        

        
        try{
            console.log(`Finished grading. Results are in results.json`);
            await writeFile(
                "scripts/evals/results.json",
                JSON.stringify(results, null, 2), // the 2 makes it indented and readable
            );
        }catch(err){
            console.error(err);
            process.exitCode = 1;
        }
        
        

    }
    
}


mainGradingFunction();