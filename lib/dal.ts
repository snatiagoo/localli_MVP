import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { businesses } from "./db/schema";

// here we have functions to handle access to certain things
// for example verifySession to see if signed in,
// or require onboarded business so that people who havent been onboarded 
// cant see dashboard for example


// WORKED — the base check: is anyone logged in at all?
//
// `cache(...)` from React deduplicates calls: if verifySession() is called
// 5 times while rendering one page (e.g. once per component that needs the
// user), React only actually runs the function once per request and reuses
// the result for the rest — not a shared cache across different requests.
//
// `auth.protect()` (the replacement for the old manual `auth()` + `redirect()`
// pattern) does both jobs in one call: it checks whether the request is
// authenticated, AND automatically redirects to the sign-in page if not —
// so unlike plain `auth()`, if this line finishes without throwing/redirecting,
// you're guaranteed to have a real userId back.
export const verifySession = cache(async () => {
  const { userId } = await auth.protect();
  return { userId };
});

// TODO — getCurrentBusiness(): also wrapped in `cache(...)` like above.
// 1. Call `await verifySession()` to get `{ userId }`.
// 2. Query the businesses table for the row where clerkUserId equals that
//    userId — same Drizzle pattern used elsewhere: `db.select().from(businesses).where(eq(businesses.clerkUserId, userId))`.
//    That returns an ARRAY (even though clerkUserId is unique, so it's at
//    most one row) — destructure the first element out: `const [business] = await ...`.
// 3. Return the business, or `null` if it wasn't found (a signed-in user who
//    hasn't started onboarding yet has no business row at all).
export const getCurrentBusiness = cache(async () => {
  const { userId } = await verifySession();
  const [business] = await db.select().from(businesses).where(eq(businesses.clerkUserId, userId))
  return business ? business : null;
});

// TODO — requireOnboardedBusiness(): the real "is this user allowed on the
// dashboard" check (a database read, unlike proxy.ts, which no longer does
// any auth logic at all now).
// 1. Call `await getCurrentBusiness()`.
// 2. If it's null, OR it exists but its `onboardingCompletedAt` field is
//    still empty, call `redirect("/onboarding")` (imported at the top).
// 3. Otherwise, return the business.
export async function requireOnboardedBusiness() {
  const res = await getCurrentBusiness();
  if(res === null || !res.onboardingCompletedAt){
    redirect("/onboarding")
  }
  return res;
}


export async function requireActiveSubscription(){

  const business = await requireOnboardedBusiness();

  if(business.subscriptionStatus !== "active"){
    redirect("/paywall")
  }

  return business;


}

// TODO — requirePreviousOnboardingSteps(): guard for /onboarding/logistics
// (the final step). Right now someone can navigate straight to that URL and
// submit it, which sets `onboardingCompletedAt` — the one field
// requireOnboardedBusiness() checks — even if they skipped basics/menu/
// audience entirely, leaving a business row with no name/goal that never
// gets fixed since onboarding is already "done" as far as the app is
// concerned. This function is the fix: called at the top of
// app/onboarding/logistics/page.tsx, same way requireOnboardedBusiness() is
// called at the top of the dashboard.
//
// Note what's actually "mandatory" here: looking at the Zod schemas in
// lib/validation/onboarding-schema.ts, basicsSchema requires `name` and
// `goal` — menuSchema and audienceSchema have NO required fields (dishes,
// specials, targetAudience, brandTone are all optional). So the only two
// fields worth checking are the ones from the basics step; there's nothing
// to enforce from menu/audience because nothing there is actually required.
//
// 1. Call `await getCurrentBusiness()` (already defined above).
// 2. If it's `null` (no business row exists at all — they never submitted
//    basics), or the row exists but `name` or `goal` is falsy, call
//    `redirect("/onboarding/basics")`.
// 3. Otherwise return the business, same return-the-value-through pattern
//    as requireOnboardedBusiness().
//
// Once you've written this, call it from
// app/onboarding/logistics/page.tsx instead of (or alongside) however that
// page currently reads the business — same one-line-at-the-top-of-the-page
// pattern already used for the dashboard.

export async function requirePreviousOnboardingSteps(){
  const business = await getCurrentBusiness();

  if(!business || !business.name || !business.goal){
    redirect("/onboarding/basics");
  }else{
    return business;
  }
}
