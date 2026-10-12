import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod.mjs";
import { creativeBrief } from "@/lib/suggestions/generate-brief";

function logError(label: string, err: unknown) {
    // function we will sue to see teh error properly
  if (err instanceof Anthropic.APIError) {
    console.log(label, {
      type: err.constructor.name,   // e.g. "AuthenticationError"
      status: err.status,           
      requestID: err.requestID,     // what Anthropic support asks for
      message: err.message,
    });
  } else {
    console.log(label, "NOT an APIError:", err);
  }
}


// first test function with real API call though
// to test waht the output is from a bad API key
async function badKey() {
  const client = new Anthropic({ apiKey: "sk-ant-fake" }); // bad key
  try {
    await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 20, // limit on test for gods sake (im broke)
      messages: [{ role: "user", content: "hola" }], 
    });
  } catch (err) {
    logError("badKey", err);
  }
}



async function badModel(){
    const client = new Anthropic();
    try{
        await client.messages.create({
            model: "santa_claude-1-5",
            max_tokens: 20,
            messages: [{ role: "user", content: "hola"}],
        })
    } catch(err) {
        logError("badModel", err);
    }

}


async function timeout(){
    const client = new Anthropic({ timeout: 1, maxRetries: 0});
    try{
        await client.messages.create({
            model: "claude-haiku-4-5",
            max_tokens: 20,
            messages: [{ role: "user", content: "hola"}],
        })
    } catch(err) {
        logError("timeout", err);
    }

}



async function truncated(){
    const client = new Anthropic();
    try{
        await client.messages.parse({
            model: "claude-haiku-4-5",
            max_tokens: 50,
            messages: [{ role: "user", content: "hola"}],
            output_config: { format: zodOutputFormat(creativeBrief)}
            
        })
    } catch(err) {
        logError("truncated", err);
    }

}


async function happyPath(){
    const client = new Anthropic();
    let response;
    try{
        response = await client.messages.parse({
            model: "claude-haiku-4-5",
            max_tokens: 1024,
            messages: [{ role: "user", content: "hola"}],
            output_config: { format: zodOutputFormat(creativeBrief)}
            
        })
    } catch(err) {
        logError("happyPath", err);
        return;
    }

    return response;
    

}


async function main(){

    await badKey();
        // I got 401, authentication error of invalid api key, no retry
        // retryign woudlnt help
    await badModel();
        // I got 404 NotFound for model
        // retryign wouldnt help
    await timeout();
        // I got APIConnectionTimeout, no status or requestId
        // retrying could help
    await truncated();
        // I got an Anthropic error, but not an API error
        // retrying wouldnt help

    const happyPathData = (await happyPath());
        // no need to retry anything

    console.log(happyPathData?.stop_reason); // end_turn
    console.log(happyPathData?._request_id); // no requestId as in timeout
    console.log(happyPathData?.parsed_output); // the expected shape output


    // Then we have:
    //429 rate limit
        // either request or token per minute based
        // as we are using API and not tier, retry with backoff can help

    //529 overloaded
        // API overloaded
        // retry with backoff can help
}

main();