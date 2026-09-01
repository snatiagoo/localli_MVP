"use server";
import { verifySession } from "@/lib/dal";
import { audienceSchema } from "@/lib/validation/onboarding-schema";
import { businesses } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import z from "zod";


export type AudienceFormState = ReturnType<typeof z.treeifyError<z.infer<typeof audienceSchema>>>;

export async function saveAudience(prevState: AudienceFormState, formData: FormData){

    const { userId } = await verifySession();



    const validated = audienceSchema.safeParse({
        targetAudience: formData.get("targetAudience"),
        brandTone: formData.get("brandTone"),
    })

    if(!validated.success){
        return z.treeifyError(validated.error);
    }

    await db.insert(businesses).values({

        clerkUserId: userId,
        targetAudience: validated.data.targetAudience,
        brandTone: validated.data.brandTone
    }).onConflictDoUpdate({
        target: businesses.clerkUserId,
        set: {
            targetAudience: validated.data.targetAudience,
            brandTone: validated.data.brandTone
        }
    })

    redirect("/onboarding/logistics")
    
}