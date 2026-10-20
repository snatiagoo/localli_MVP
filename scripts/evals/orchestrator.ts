import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod.mjs";
import z from "zod";
import { config } from "dotenv";
config({ path: ".env.local" });
import testCases from "./test-cases.json";
import { graderSystem } from "./prompts";
import { format, formats } from "@/lib/db/formats";
import { testBusiness } from "./generate-test-cases";
import { mainFunction } from "@/lib/suggestions/generate-brief";
import { Goal } from "@/lib/content/goals";



const client = new Anthropic();

const gradeOutputObject = z.object({
    reason: z.string(),
    valueNaturalSpanish: z.int().max(5).min(1),
    valuePlainWriting: z.int().max(5).min(1),
    valueCaptionQuality: z.int().max(5).min(1),
    valueFormatGoalFit: z.int().max(5).min(1),
    valueAverage: z.int().max(5).min(1),
    valueDishesAndSpecials: z.int().max(5).min(1),
    
})

const graderOutput = z.object({
    testCases: z.array(gradeOutputObject),
});
// build runner flow
    // it picks 2-3 formats per business (so it needs format data)
    // and calls mainFunction with them
    // then code checks
    // and model grader (model with prompt to grade each output)

async function outputModelGrader(outputResult: string, business, format: format){ 
    
    const grade = await client.messages.parse({
        max_tokens: 16000,
        model: "claude-opus-5-5",
        system: graderSystem,

        messages: [{
            role: "user",
            content: `
                BUSINESS:  ${JSON.stringify(business)}\n
                FORMAT: ${format} \n
                Output to test: ${outputResult}\n
            `,
        }],
        output_config: { format: zodOutputFormat(graderOutput)}
    });
    const gradeData = grade.parsed_output;

    return gradeData;
}




async function mainGradingFunction(){
    
    for(const testCase of testCases){
        
        const eligible = formats.filter(format => format.goalTags.includes(testCase.goal as Goal));
        

        const response = await mainFunction()
        const modelGrade = await outputModelGrader()

    }
    
}