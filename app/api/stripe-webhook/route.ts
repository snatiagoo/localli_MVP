
import { stripe } from "@/lib/stripe";
import { NextRequest } from "next/server";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;


export async function POST(request: NextRequest){

    if(!endpointSecret) {
        return new Response('Failed to get Stripe endpoint secret', {status: 400});
    }

    const rawBody = await request.text();

    //wasnt there soemthign about text/json before this?
    //Get signature
    const signature = request.headers.get('stripe-signature');
    if(!signature){
        return new Response('No signature', { status: 400 })
    }

    try{
        const event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            endpointSecret
         )


    }catch(e){
        
        return new Response(
            (e instanceof Error) ? e.message : String(e),
             {status: 400}
            );
    }
    
    
    

}