
import { db } from "@/lib/db";
import { businesses } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";
import { NextRequest } from "next/server";
import Stripe from "stripe";
import { SubStatus } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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

    let event: Stripe.Event;
    try{
        event = stripe.webhooks.constructEvent(
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

    switch(event.type){
        case 'checkout.session.completed':{
            const session = event.data.object;
            const cId = typeof session.customer === "string" 
            ? session.customer
            : session.customer?.id;

            const subId = typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

            if(!cId){
                return new Response("Missing customer id", { status: 400 });
            }

            await db.update(businesses).set({
                subscriptionStatus : "active",
                stripeSubscriptionId: subId

            }).where(eq(businesses.stripeCustomerId, cId))

            return new Response("Successfully created subscription", 
                {status: 200}
            )

        }
            

        case 'customer.subscription.updated':{
            const session = event.data.object;
            const cId = typeof session.customer === "string" 
            ? session.customer
            : session.customer?.id;

            if(!cId){
                return new Response("Missing customer id", { status: 400 });
            }

            await db.update(businesses).set({
                subscriptionStatus: session.status,
            }).where(eq(businesses.stripeCustomerId, cId));

            return new Response("Successfully updated subscription", 
                {status: 200}
            )

        }
             

        case 'customer.subscription.deleted':{
            const session = event.data.object;
            const cId = typeof session.customer === "string" 
            ? session.customer
            : session.customer?.id;

            if(!cId){
                return new Response("Missing customer id", { status: 400 });
            }

            await db.update(businesses).set({
                subscriptionStatus: session.status,
            }).where(eq(businesses.stripeCustomerId, cId));


            return new Response("Successfully deleted subscription", 
                {status: 200}
            )

        }

        default: return new Response("Event type not handled", { status: 200 });


    }
    
    
    

}