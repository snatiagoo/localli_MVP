import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod.mjs";
import { config } from "dotenv";
config({ path: ".env.local" });

import z from "zod";
import { testCasesSystem, userMessage } from "./prompts";
import { writeFile } from "fs/promises";
import { testBusiness } from "./types";

const client = new Anthropic();



const testOutput = z.object({
    testCases: z.array(testBusiness)
}); // is this fine?




export async function generateTestCases(){

    const data = await client.messages.parse({
        max_tokens: 16000,
        model: "claude-haiku-5-5",
        system: testCasesSystem,
        messages: [{
            role: "user",
            content: userMessage,
        }

        ],
        output_config: {format: zodOutputFormat(testOutput)}
    });

    if(data.stop_reason == "max_tokens"){
        throw new Error("Max tokens, not valid request: " + data.id);
    }else if(!data.parsed_output){
        throw new Error("Null parsed output on request: " + data.id);
    }
        
    if(data.parsed_output.testCases.length !== 20){
        console.warn("Did not generate 20 test cases on request: " + data.id);
    }

    return data.parsed_output.testCases;
}



export async function main(){
    try{
        const testCases = await generateTestCases();
        console.log(`Saved ${testCases.length} test cases`);
        await writeFile(
            "scripts/evals/test-cases.json",
            JSON.stringify(testCases, null, 2), // the 2 makes it indented and readable

        );

    }catch(err){
        console.error(err);
        process.exitCode = 1;
    }
}

main();