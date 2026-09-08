'use server';

import { stripe } from "@/lib/stripe";
import { requireOnboardedBusiness } from "@/lib/dal";
import { db } from "@/lib/db";
import { businesses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function checkoutFunction(){
    const business = await requireOnboardedBusiness();
    let customerId = business.stripeCustomerId;

    if(!customerId){
        customerId =  (await stripe.customers.create({
            name: business.name as string,
            metadata: { businessId: business.id}
        })).id;

        await db.update(businesses).set({
            stripeCustomerId: customerId
        }).where(eq(businesses.id, business.id))
    }


    const session = await stripe.checkout.sessions.create(
        {
            customer: customerId,
            line_items: [{
                price: process.env.STRIPE_PRICE_ID,
                quantity: 1
            }],
            mode: "subscription",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/paywall/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/paywall`,
        }
    )

    if(!session.url) throw new Error("Missing session URL from Stripe")
    redirect(session.url);


}