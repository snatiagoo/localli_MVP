"use server";
import { verifySession } from "@/lib/dal";
import { audienceSchema, logisticSchema } from "@/lib/validation/onboarding-schema";
import { businesses } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import z from "zod";

// One combined schema out of the two onboarding schemas — spreading both
// `.shape`s into a fresh z.object() rather than reusing audienceSchema or
// logisticSchema on their own, since this form saves both sections at once.
const settingsSchema = z.object({
    ...audienceSchema.shape,
    ...logisticSchema.shape,
});

export type SettingsFormState = ReturnType<typeof z.treeifyError<z.infer<typeof settingsSchema>>>;

export async function updateBusinessSettings(prevState: SettingsFormState, formData: FormData) {

    const { userId } = await verifySession();

    const validated = settingsSchema.safeParse({
        targetAudience: formData.get("targetAudience"),
        brandTone: formData.get("brandTone"),
        contentComfortLevel: formData.get("contentComfortLevel"),
        postingFrequency: formData.get("postingFrequency"),
        socialHandles: {
            instagram: formData.get("instagramHandle") || undefined,
            tiktok: formData.get("tiktokHandle") || undefined,
            facebook: formData.get("facebookHandle") || undefined,
        },
        address: formData.get("address"),
        phone: formData.get("phone"),
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
        socialHandles: validated.data.socialHandles,
        address: validated.data.address,
        phone: validated.data.phone,
    }).where(eq(businesses.clerkUserId, userId));

    // No redirect — this form lives on the dashboard itself. revalidatePath
    // tells Next.js the data backing this route changed, so the next render
    // picks up the fresh values instead of showing stale cached data.
    revalidatePath("/dashboard");

    return { errors: [] };
}
