"use server";
import { verifySession } from "@/lib/dal";
import { logisticSchema } from "@/lib/validation/onboarding-schema";
import { businesses } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import z from "zod";


export type LogisticFormState = ReturnType<typeof z.treeifyError<z.infer<typeof logisticSchema>>>;

export async function saveLogistics(prevState: LogisticFormState, formData: FormData){

    const { userId } = await verifySession();



    const validated = logisticSchema.safeParse({
        contentComfortLevel: formData.get("contentComfortLevel"),
        postingFrequency: formData.get("postingFrequency"),
        socialHandles: {
            instagram: formData.get("instagramHandle") || undefined,
            tiktok: formData.get("tiktokHandle") || undefined,
            facebook: formData.get("facebookHandle") || undefined,
        },
        address: formData.get("address"),
        phone: formData.get("phone")
    })



    if(!validated.success){
        return z.treeifyError(validated.error);
    }

    await db.insert(businesses).values({

        clerkUserId: userId,
        contentComfortLevel: validated.data.contentComfortLevel,
        postingFrequency: validated.data.postingFrequency,
        socialHandles: validated.data.socialHandles,
        address: validated.data.address,
        phone: validated.data.phone,
        onboardingCompletedAt: new Date(),
    }).onConflictDoUpdate({
        target: businesses.clerkUserId,
        set: {
            contentComfortLevel: validated.data.contentComfortLevel,
            postingFrequency: validated.data.postingFrequency,
            socialHandles: validated.data.socialHandles,
            address: validated.data.address,
            phone: validated.data.phone,
            onboardingCompletedAt: new Date(),
        }
    })

    redirect("/dashboard");
    
}