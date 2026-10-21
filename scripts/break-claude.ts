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

// the user will see an error page, instead of jsut one failign component or area



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

// the user will see an error page, instead of jsut one failign component or area


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

// vercel timeout error after default tiemout of 10 mintues if I dont change
// anything




async function truncated(){
    const client = new Anthropic();
    let response;
    try{
        response = await client.messages.parse({
            model: "claude-haiku-4-5",
            max_tokens: 50,
            messages: [{ role: "user", content: "hola"}],
            output_config: { format: zodOutputFormat(creativeBrief)}
            
        })
    } catch(err) {
        logError("truncated", err);
        return;
    }

    return response;
}

// I get not an API error, when there is a trucnated error
// else I either get a full resposne in udner 50 tokens (end_turn)
    // in these cases returned response is not valid for my standards
// or I get max_tokens stop reason (not full response, but not error)

// so I have to handle stops due to max_tokens 
// and also empty madnatory fields (liek empty shotlist)

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
// whatever, it works

async function main(){

    await badKey();
        // I got 401, authentication error of invalid api key, no retry
        // retryign woudlnt help
        // logging already handled


    await badModel();
        // I got 404 NotFound for model
        // retrying wouldnt help
        // Loggin already handled


    await timeout();
        // I got APIConnectionTimeout, no status or requestId
        // retrying could help
        // I woudl log the error itself and the requestId
    const truncatedData = (await truncated());

    console.log(truncatedData?.stop_reason); // end_turn
    console.log(truncatedData?._request_id); // no requestId
    console.log(truncatedData?.parsed_output); // the expected shape output

    // I would log the three of them


        // I got an Anthropic error, but not an API error
        // retrying wouldnt help

    const happyPathData = (await happyPath());
        // no need to retry anything

    console.log(happyPathData?.stop_reason); // end_turn
    console.log(happyPathData?._request_id); // no requestId
    console.log(happyPathData?.parsed_output); // the expected shape output

    // I woudl log the three of them


    // Then we have:
    //429 rate limit
        // either request or token per minute based
        // as we are using API and not tier, retry with backoff can help

    //529 overloaded
        // API overloaded
        // retry with backoff can help


    // for the lack of request Id we need to do parse({...}).withResponse() 
    // and assign it to const { data, request_id }
}

main();