import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod.mjs";
import z, { codec } from "zod";
import { config } from "dotenv";
config({ path: ".env.local" });
import { testBusiness } from "./generate-test-cases";


const system = ``;

const client = new Anthropic();

const gradeOutputObject = z.object({
    valueNaturalSpanish: z.number(),
    valuePlainWriting: z.number(),
    valueCaptionQuality: z.number(),
    valueFormatGoalFit: z.number(),
    valueAverage: z.number(),
    reason: z.string()
})

const output = z.array(gradeOutputObject);
// build runner flow
    // it picks 2-3 formats per business (so it needs format data)
    // and calls mainFunction with them
    // then code checks
    // and model grader (model with prompt to grade each output)

async function outputModelGrader(outputResult: string, codeCheckGrade: number){ 
    
    const grade = await client.messages.parse({
        max_tokens: 16000,
        model: "claude-opus-4-8",
        system: " ",

        messages: [{
            role: "user",
            content: `
                Output to test: ${outputResult}
                Code checks mark for given testcase: ${codeCheckGrade}
            `,
        }],
        output_config: { format: zodOutputFormat(output)}
    });
    const gradeData = grade.parsed_output;

    return gradeData;
}




async function mainFunction(){
    
}