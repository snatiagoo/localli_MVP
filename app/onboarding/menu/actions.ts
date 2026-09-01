'use server';
import { verifySession } from "@/lib/dal";
import { menuSchema } from "@/lib/validation/onboarding-schema";
import { businesses } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import z from "zod";


export type MenuFormState = ReturnType<typeof z.treeifyError<z.infer<typeof menuSchema>>>;

export async function saveMenu(prevState: MenuFormState, formData: FormData){
    const { userId } = await verifySession();
    const rawDishes = formData.get("signatureDishes");
    const rawSpecials = formData.get("specials");

    let dishes: unknown;
    let specials: unknown;

    try{
        
        dishes = JSON.parse(rawDishes as string);
        specials = JSON.parse(rawSpecials as string);

    }catch{
        return { errors: ["Something went wrong processing your submission."] }
    }
    
    const validated = menuSchema.safeParse({
        signatureDishes: dishes,
        specials: specials,
    })

    if(!validated.success){
        return z.treeifyError(validated.error);
    }
    // doing upsert, alone this time
    await db.insert(businesses).values(
        {
            clerkUserId: userId,
            signatureDishes: validated.data.signatureDishes,
            specials: validated.data.specials,
        }
    ).onConflictDoUpdate(
        {
            target: businesses.clerkUserId,
                set: {
                    signatureDishes: validated.data.signatureDishes,
                    specials: validated.data.specials,
                }
        });

    redirect("/onboarding/audience")


}