import { db } from "@/lib/db";
import { businesses } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";


// Placeholder — temporary intermediate page Stripe Checkout redirects to
// after a successful payment. Right now it's just a stand-in; it still
// needs to actually confirm the subscription is active (the webhook update
// can lag slightly behind this redirect) before sending the business on to
// /dashboard. Design + the confirming-state logic come later.


export default async function PaywallSuccessPage({
  searchParams
}:{
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams;

  if(!session_id){
    throw new Error("Session id was not found")
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ["subscription"]});
  
  const customerId = typeof session.customer === "string"
  ? session.customer
  : session.customer?.id;

  const subscription = session.subscription
  const subscriptionId = typeof subscription === "string" ? subscription : subscription?.id;
  const subscriptionStatus = typeof subscription === "string" ? undefined : subscription?.status;


  if(subscriptionStatus === undefined){
    throw new Error("Subscription from session wasnt received properly");
  }

  if(!customerId){
    throw new Error("Received no customerId from checkout session");
  }

  await db.update(businesses).set({
    stripeSubscriptionId: (await session).id,
  }).where(eq(businesses.stripeCustomerId, customerId))

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <p>Confirmando tu pago...</p>
    </main>
  );
}
