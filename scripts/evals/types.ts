import z from "zod";


export const testBusiness = z.object({
    name: z.string(),
    category: z.enum(["restaurant"]),
    goal: z.enum([ 
        "more_walk_ins"
       , "more_takeout_orders"
       , "more_reservations"
       , "more_brand_awareness"
       , "promote_new_menu_items"]),
    cuisine: z.string(),
    signatureDishes: z.array(
        z.string()
    ),
    specials: z.array(
        z.object({
            label: z.string(),
            description: z.optional(z.string()),
        })
    )
});

export type TestBusiness = z.infer<typeof testBusiness>;