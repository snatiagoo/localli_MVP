"use server";
import { verifySession } from "@/lib/dal";
import { db } from "@/lib/db";
import { businesses } from "@/lib/db/schema";
import { basicsSchema } from "@/lib/validation/onboarding-schema";
import { redirect } from "next/navigation";

import z from "zod";

type BasicsFormState = ReturnType<typeof z.treeifyError>; 
    // it will always just return an error or nothing, 
    // but in the second case we cant see it as we redirect before it

export async function saveBasics(prevState: BasicsFormState, formData: FormData){

    const { userId } = await verifySession();

    const validated = basicsSchema.safeParse({
        name: formData.get("name"),
        goal: formData.get("goal"),
        cuisine: formData.get("cuisine")
    })

    if(validated.success){
        await db.insert(businesses).values(
            {
                clerkUserId: userId,
                name: validated.data.name,
                goal: validated.data.goal,
                cuisine: validated.data.cuisine
            }).onConflictDoUpdate( 
                // if already presetn with unique clerk user Id
                // we update it (conflict -> update)
                {
                    target: businesses.clerkUserId,
                    set: {
                        name: validated.data.name,
                        goal: validated.data.goal,
                        cuisine: validated.data.cuisine
                    }
                });

        // UPSERT

        redirect("onboarding/menu");

    }else{
        return z.treeifyError(validated.error);
    }


}