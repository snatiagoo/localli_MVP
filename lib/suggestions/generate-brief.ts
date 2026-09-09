import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod.mjs";
import { db } from "../db";
import { businesses, contentFormats } from "../db/schema";
import { eq } from "drizzle-orm";


const client = new Anthropic();



export const creativeBrief = z.object({
    shotList: z.array(z.object({
        order: z.number(),
        description: z.string(),
        durationSeconds: z.optional(z.number())
    })),
    editingNotes: z.nullable(z.object({
        cuts: z.optional(z.string()),
        music: z.optional(z.string()),
        textOverlays: z.optional(z.array(z.object({
            atSecond: z.number(),
             text: z.string()
        })))
    })),
    caption: z.string(),
    targetDurationSeconds: z.optional(z.number())
})

async function fetchContentFormat(id: string){

    const row = await db.select().from(contentFormats).where(eq(contentFormats.id, id));

    return row;
}



export async function mainFunction(id: string, business:
    Pick<typeof businesses.$inferSelect, "name" | "category" | "goal" | "cuisine" | "signatureDishes" | "specials">){

    const rows = await fetchContentFormat(id);
    const formatRow = rows[0];

    const response = await client.messages.parse({
        model: "claude-sonnet-5",
        max_tokens: 1024,
        system: "You are a social media content strategist for RESTAURANTS, ALWAYS respond in SPANISH. The person filming is a restaurant owner with a phone, not a photographer or videographer — in shotList and editingNotes, use plain everyday words for what to film and how to cut it, never technical photography/videography jargon (e.g. avoid terms like 'plano contrapicado', 'regla de los tercios', 'profundidad de campo', 'dolly', 'gimbal'); say things like 'graba de cerca' or 'acércate al plato' instead. In the caption, wrap 1-3 key words or short phrases in double asterisks (**like this**) to mark them for bold emphasis when displayed — e.g. the dish name or the call to action. Don't bold more than that, and never use asterisks anywhere else in the caption.",
        messages: [
            {
                role: "user",
                content: `Business: 
                    businessName=${business.name}
                    businessCategory=${business.category},
                    businessGoal=${business.goal},
                    businessCuisine=${business.cuisine},
                    businessSignatureDishes=${business.signatureDishes?.join(";")},
                    businessSpecials=${business.specials?.map(
                        (s) => (s.description? s.label + "," + s.description : s.label ))
                        .join(";")}
                    //
                    Format: 
                    formatName=${formatRow.name},
                    formatMediaType=${formatRow.mediaType},
                    formatDescription=${formatRow.description},
                    formatComfortLevelRequired=${formatRow.requiresComfortLevel},
                    formatCategory=${formatRow.category},
                    formatPROMPTGUIDANCE=${formatRow.promptGuidance},
                    `
            }
        ],
        output_config: { format: zodOutputFormat(creativeBrief)}
    })

    return response;

}


    



