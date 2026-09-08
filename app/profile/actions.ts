"use server";
import { verifySession } from "@/lib/dal";
import { basicsSchema, menuSchema, logisticSchema } from "@/lib/validation/onboarding-schema";
import { businesses } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import z from "zod";

// socialHandles/address/phone live here now, not on the dashboard settings
// form — they're static business info, not weekly-generation tuning knobs.
const profileSchema = z.object({
    ...basicsSchema.shape,
    ...menuSchema.shape,
    ...logisticSchema.pick({ socialHandles: true, address: true, phone: true }).shape,
});

export type ProfileFormState = ReturnType<typeof z.treeifyError<z.infer<typeof profileSchema>>>;

export async function updateBusinessProfile(prevState: ProfileFormState, formData: FormData) {

    const { userId } = await verifySession();

    const rawDishes = formData.get("signatureDishes");
    const rawSpecials = formData.get("specials");

    let dishes: unknown;
    let specials: unknown;

    try {
        dishes = JSON.parse(rawDishes as string);
        specials = JSON.parse(rawSpecials as string);
    } catch {
        return { errors: ["Something went wrong processing your submission."] };
    }

    const validated = profileSchema.safeParse({
        name: formData.get("name"),
        cuisine: formData.get("cuisine"),
        goal: formData.get("goal"),
        signatureDishes: dishes,
        specials: specials,
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

    await db.update(businesses).set({
        name: validated.data.name,
        cuisine: validated.data.cuisine,
        goal: validated.data.goal,
        signatureDishes: validated.data.signatureDishes,
        specials: validated.data.specials,
        socialHandles: validated.data.socialHandles,
        address: validated.data.address,
        phone: validated.data.phone,
    }).where(eq(businesses.clerkUserId, userId));

    revalidatePath("/profile");

    return { errors: [] };
}
