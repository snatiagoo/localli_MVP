import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { businesses, contentFormats, suggestions } from "@/lib/db/schema";
import {
  selectFormats,
  type ContentFormatDef,
  type SelectFormatsInput,
} from "@/lib/content/format-selection";
import type { Goal } from "@/lib/content/goals";
import type { ComfortLevel } from "@/lib/db/schema";



export async function getAvailableFormats(category: string): Promise<ContentFormatDef[]> {
  const rawAvailableFormats = await db.select().from(contentFormats)
  .where(and(eq(contentFormats.category, category), eq(contentFormats.active, true)))

  const availableFormats: ContentFormatDef[] = rawAvailableFormats.map(
    (f) => (
      {
        id: f.id, 
        mediaType: f.mediaType, 
        goalTags:f.goalTags, 
        requiresComfortLevel: f.requiresComfortLevel, 
        active:f.active})
  )

  return availableFormats
  
}

export async function getRecentlyUsedFormatIds(businessId: string): Promise<string[]> {
  const rawRecentFormats = await db.select().from(suggestions)
  .where(eq(suggestions.businessId, businessId))
  .orderBy(desc(suggestions.weekStartDate), desc(suggestions.position));

  const formatIds = rawRecentFormats.map(
    (r) => (r.formatId)
  )

  const dedupedFormats = [...new Set(formatIds)]; // array made with an iterable of a new set

  return dedupedFormats;
}



// The narrow slice of a business row this function actually needs — same
// idea as ContentFormatDef in format-selection.ts, kept minimal on purpose.
export type BusinessForGeneration = Pick<
  typeof businesses.$inferSelect,
  "id" | "category" | "goal" | "contentComfortLevel" | "postingFrequency"
>;





export async function generateWeeklyFormats(
  business: BusinessForGeneration,
): Promise<ContentFormatDef[]> {

  const [availableFormats, recentlyUsedFormatIds] = await Promise.all([
    getAvailableFormats(business.category),
    getRecentlyUsedFormatIds(business.id)
  ]);

  const input: SelectFormatsInput = {
    goal: business.goal as Goal,
    contentComfortLevel: business.contentComfortLevel as ComfortLevel,
    availableFormats: availableFormats,
    recentlyUsedFormatIds: recentlyUsedFormatIds,
    count: business.postingFrequency as number
  }

  const res =  selectFormats(input);

  return res;
}
