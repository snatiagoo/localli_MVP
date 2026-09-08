"use server";
import { verifySession } from "@/lib/dal";
import { audienceSchema, logisticSchema } from "@/lib/validation/onboarding-schema";
import { businesses } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import z from "zod";

// One combined schema out of audienceSchema plus just the two logisticSchema
// fields that actually drive weekly generation (comfort level, posting
// frequency) — socialHandles/address/phone moved to the profile page, since
// they're static business info, not weekly-generation tuning knobs.
const settingsSchema = z.object({
    ...audienceSchema.shape,
    ...logisticSchema.pick({ contentComfortLevel: true, postingFrequency: true }).shape,
});

export type SettingsFormState = ReturnType<typeof z.treeifyError<z.infer<typeof settingsSchema>>>;

export async function updateBusinessSettings(prevState: SettingsFormState, formData: FormData) {

    const { userId } = await verifySession();

    const validated = settingsSchema.safeParse({
        targetAudience: formData.get("targetAudience"),
        brandTone: formData.get("brandTone"),
        contentComfortLevel: formData.get("contentComfortLevel"),
        postingFrequency: formData.get("postingFrequency"),
    });

    if (!validated.success) {
        return z.treeifyError(validated.error);
    }

    // Plain UPDATE, not the onboarding steps' insert().onConflictDoUpdate()
    // — by the time someone can reach the dashboard, their business row is
    // guaranteed to already exist, so there's nothing to "insert" here.
    await db.update(businesses).set({
        targetAudience: validated.data.targetAudience,
        brandTone: validated.data.brandTone,
        contentComfortLevel: validated.data.contentComfortLevel,
        postingFrequency: validated.data.postingFrequency,
    }).where(eq(businesses.clerkUserId, userId));

    // No redirect — this form lives on the dashboard itself. revalidatePath
    // tells Next.js the data backing this route changed, so the next render
    // picks up the fresh values instead of showing stale cached data.
    revalidatePath("/dashboard");

    return { errors: [] };
}
