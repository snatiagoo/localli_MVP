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

// WORKED — combining two WHERE conditions with `and()`.
// You've only used a single `eq(...)` as the whole `.where()` before. When
// you need MORE than one condition to all be true, `and()` takes any number
// of conditions and combines them — `.where(and(eq(a, 1), eq(b, 2)))` means
// "a = 1 AND b = 2". Example, unrelated to this file, just showing the shape:
//   db.select().from(contentFormats)
//     .where(and(eq(contentFormats.category, "restaurant"), eq(contentFormats.active, true)))

// WORKED — sorting rows with `.orderBy(desc(...))`.
// `.orderBy()` goes after `.where()` and takes one or more columns wrapped
// in `desc(...)` (descending, newest/highest first) or `asc(...)` (ascending).
// You can pass multiple, comma-separated, as tiebreakers — the first one is
// the primary sort, the second breaks ties in the first, etc. Example:
//   db.select().from(suggestions)
//     .where(eq(suggestions.businessId, "some-id"))
//     .orderBy(desc(suggestions.weekStartDate), desc(suggestions.position))
// That reads: sort by week (newest week first), and within the same week,
// by position descending (so position 3 before position 1).

// TODO — getAvailableFormats(category): fetch this business category's
// active format library, mapped down to the narrow ContentFormatDef shape
// selectFormats() expects.
// 1. Query contentFormats where category equals the `category` param AND
//    active is true (use `and()` + `eq()` as shown above).
// 2. The query returns full DB rows (with name, description, promptGuidance,
//    etc. — fields ContentFormatDef doesn't need). Map each row down to
//    just `{ id, mediaType, goalTags, requiresComfortLevel, active }`.
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

// TODO — getRecentlyUsedFormatIds(businessId): this business's suggestion
// history, as an array of formatIds ordered most-recent-first (what
// SelectFormatsInput.recentlyUsedFormatIds expects).
// 1. Query suggestions where businessId equals the param, selecting just
//    the formatId column: `db.select({ formatId: suggestions.formatId }).from(...)`.
// 2. Order by weekStartDate desc, then position desc (as shown above) — so
//    the array comes back newest-suggestion-first.
// 3. That query returns objects like `{ formatId: string }[]` — pull out
//    just the formatId values into a plain `string[]`.
// 4. Dedupe while KEEPING the first (= most recent) occurrence of each id,
//    dropping any later repeats. `[...new Set(idsArray)]` does exactly
//    this, because Set preserves insertion order and only keeps the first
//    time each value appears.
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

// TODO — generateWeeklyFormats(business): the orchestrator. Takes an
// already-onboarded business row and returns the formats selectFormats()
// picked for it.
// 1. Call getAvailableFormats(business.category) and
//    getRecentlyUsedFormatIds(business.id). Run them concurrently with
//    Promise.all since neither depends on the other's result:
//    `const [availableFormats, recentlyUsedFormatIds] = await Promise.all([...])`.
// 2. Build a SelectFormatsInput object: goal (cast business.goal as Goal),
//    contentComfortLevel (cast business.contentComfortLevel as
//    ComfortLevel), availableFormats, recentlyUsedFormatIds, and count
//    (cast business.postingFrequency as number). No excludeFormatIds —
//    that's only used by the future regenerate flow.
// 3. Call and return selectFormats(input).

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
