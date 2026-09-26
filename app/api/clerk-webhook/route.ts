import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { businesses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";



export async function POST(request: NextRequest){

    try{
        const evt = await verifyWebhook(request);

        if(!evt.data.id){
            return new Response('No user id', { status: 400 })
        }

        const id = evt.data.id;

        const business = await db.select().from(businesses)
            .where(eq(businesses.clerkUserId, id));

        if(!business[0]) return new Response('No business row on db', {status: 400});

        const stripeSubscriptionId = business[0].stripeSubscriptionId;

        if(stripeSubscriptionId){
            await stripe.subscriptions.cancel(
            stripeSubscriptionId
            );  
        }

        await db.delete(businesses).where(eq(businesses.clerkUserId, id));


    }catch(e){
        return new Response(
            (e instanceof Error) ? e.message : String(e),
             {status: 500}
            );
    }


}