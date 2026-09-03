import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod.mjs";
import { db } from "../db";
import { businesses, contentFormats } from "../db/schema";
import { eq } from "drizzle-orm";


const client = new Anthropic();



const creativeBrief = z.object({
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
})

async function fetchContentFormat(id: string){

    const row = await db.select().from(contentFormats).where(eq(contentFormats.id, id));

    return row;
}



async function mainFunction(id: string, business:
    Pick<typeof businesses.$inferSelect, "name" | "category" | "goal" | "cuisine" | "signatureDishes" | "specials">){

    const rows = await fetchContentFormat(id);
    const formatRow = rows[0];

    const response = await client.messages.parse({
        model: "claude-sonnet-5",
        max_tokens: 1024,
        system: "You are a social media content strategist for RESTAURANTS, ALWAYS respond in SPANISH",
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
                        (s) => (s.description? s.label: s.label + "," + s.description))
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


    



