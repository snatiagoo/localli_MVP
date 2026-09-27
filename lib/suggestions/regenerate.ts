
import { businesses, ComfortLevel, suggestions } from "../db/schema";
import { db } from "../db";
import { and, eq } from "drizzle-orm";
import { getAvailableFormats, getRecentlyUsedFormatIds } from "./weekly-generation";
import { selectFormats, SelectFormatsInput } from "../content/format-selection";
import { Goal } from "../content/goals";
import { saveSuggestion } from "./orchestrator";

const REGENERATIONS_PER_WEEK_LIMIT = 3;

// Thrown instead of a plain Error so the action layer can tell "hit the
// rate limit" apart from a genuine failure and show a calmer message.
export class RegenerationLimitError extends Error {}


export function canRegenerate(
    regenerationsUsed: number,
    regenerationWeekStartDate: string |null,
    currentWeekStartDate: string | null
){

    const isNewWeek = regenerationWeekStartDate !== currentWeekStartDate;
    const newRegens = isNewWeek ? 0 : regenerationsUsed;

    return newRegens < REGENERATIONS_PER_WEEK_LIMIT;

}



export async function regenerateSuggestion(suggestionId: string){

    const [old] = await db.select().from(suggestions).where(
        eq(suggestions.id, suggestionId)
    )
    const position = old.position;
    const oldId = old.id;
    const businessId = old.businessId;
    const weekStartDate = old.weekStartDate;


    const [business] = await db.select().from(businesses).where(
        eq(businesses.id, old.businessId)
    )

    

    if (!canRegenerate(business.regenerationsUsed, business.regenerationsWeekStartDate, weekStartDate)) {
        throw new RegenerationLimitError(
            `Ya usaste tus ${REGENERATIONS_PER_WEEK_LIMIT} regeneraciones de esta semana.`,
        );
    }

    await db.update(businesses).set({
        regenerationsUsed: business.regenerationsUsed + 1,
        regenerationsWeekStartDate: weekStartDate,
    }).where(eq(businesses.id, businessId));

    const excludeList = await db.select().from(suggestions).where(
        and(
            eq(suggestions.businessId, businessId),
            eq(suggestions.weekStartDate, weekStartDate )
        )
    )
    const idsExcluded = excludeList.map((e) => (e.formatId));

    const availableFormats = await getAvailableFormats(business.category);

    const recentlyUsedFormatIds = await getRecentlyUsedFormatIds(businessId);
    
    
    const input: SelectFormatsInput = {
        goal: business.goal as Goal,
        contentComfortLevel: business.contentComfortLevel as ComfortLevel,
        availableFormats: availableFormats,
        recentlyUsedFormatIds: recentlyUsedFormatIds,
        excludeFormatIds: idsExcluded,
        count: 1
    }


    const [replacementFormat] = selectFormats(input);
    if(!replacementFormat){
        throw new Error("Replacement format not found");
    }
    const mediaType = replacementFormat.mediaType;
    const formatId = replacementFormat.id;
    

    await db.delete(suggestions).where(eq(suggestions.id, suggestionId))
    
    await saveSuggestion(formatId, business, mediaType, position, weekStartDate, true, oldId)

}