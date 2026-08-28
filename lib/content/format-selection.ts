import type { Goal } from "./goals";
import type { ComfortLevel, MediaType } from "@/lib/db/schema";

// WORKED — comfort levels have an order: a business comfortable with
// "confident_video" can also handle anything a "simple_video" or
// "photo_only" business could. This map turns each level into a number so
// we can compare them with <=.
const COMFORT_ORDER: Record<ComfortLevel, number> = {
  photo_only: 0,
  simple_video: 1,
  confident_video: 2,
};

// The subset of a content_formats row this algorithm actually needs — kept
// narrow on purpose so this file has zero dependency on Drizzle or the DB;
// the caller (lib/suggestions/weekly-generation.ts, built later) is
// responsible for fetching real rows and passing them in this shape.
export type ContentFormatDef = {
  id: string;
  mediaType: MediaType;
  goalTags: Goal[]; // [] = suits every goal
  requiresComfortLevel: ComfortLevel;
  active: boolean;
};

export type SelectFormatsInput = {
  goal: Goal;
  contentComfortLevel: ComfortLevel;
  availableFormats: ContentFormatDef[];
  recentlyUsedFormatIds: string[]; // most-recent-first
  excludeFormatIds?: string[]; // regenerate: formats already rejected for this slot
  count: number;
};

// WORKED — freshness score: how "not recently used" a format is. A format
// NOT in recentlyUsedFormatIds at all (never suggested before) gets
// `Infinity` — the freshest possible value, higher than any real number. A
// format that WAS used gets its index in that array as its score: index 0
// (most recently used) scores 0 (least fresh), a higher index (used longer
// ago) scores higher (fresher).
function freshnessScore(id: string, recentlyUsedFormatIds: string[]): number {
  const index = recentlyUsedFormatIds.indexOf(id);
  return index === -1 ? Infinity : index;
}

// WORKED — sorting by freshness needs one careful step: comparing two
// scores by plain subtraction (scoreB - scoreA) breaks when BOTH are
// Infinity, because `Infinity - Infinity` is `NaN`, not 0 — and a sort
// comparator returning NaN produces undefined/inconsistent ordering. So we
// compare with `!==` first (which works fine for Infinity) and only
// subtract once we know at least one side is a normal finite number.
function compareByFreshness(
  a: ContentFormatDef,
  b: ContentFormatDef,
  recentlyUsedFormatIds: string[],
): number {
  const scoreA = freshnessScore(a.id, recentlyUsedFormatIds);
  const scoreB = freshnessScore(b.id, recentlyUsedFormatIds);

  if (scoreA !== scoreB) {
    return scoreB - scoreA; // higher score (fresher) sorts first
  }

  // Equal freshness (including "both never used") — fall back to a fixed,
  // deterministic tiebreak so the same input always produces the same
  // output, with no randomness involved.
  return a.id.localeCompare(b.id);
}

// TODO — this is the actual algorithm. Three steps, using the pieces above:
//
// STEP 1: filter `input.availableFormats` down to only the "eligible" ones.
// A format is eligible only if ALL of these are true:
//   - format.active is true (retired formats are never selectable)
//   - format.id is NOT in input.excludeFormatIds (careful: this is
//     optional — it might be undefined, so handle that case; converting it
//     to a Set first with `new Set(input.excludeFormatIds ?? [])` makes the
//     "is this id in there" check both easy and fast)
//   - COMFORT_ORDER[format.requiresComfortLevel] is <= COMFORT_ORDER[input.contentComfortLevel]
//     (the format doesn't need more comfort than the business has)
//   - format.goalTags is empty (universal) OR includes input.goal
//
// STEP 2: sort the eligible array using compareByFreshness (defined above),
// passing input.recentlyUsedFormatIds as its third argument. Array.sort()
// takes a comparator function: `someArray.sort((a, b) => ...)` — you can
// pass compareByFreshness directly if you wrap it to supply the third
// argument, e.g. `.sort((a, b) => compareByFreshness(a, b, input.recentlyUsedFormatIds))`.
// Note: .sort() mutates the array it's called on — copy the array first
// with `[...eligible]` if you don't want to mutate the filtered result.
//
// STEP 3: return only the first `input.count` items (Array.slice is your
// friend here).
export function selectFormats(input: SelectFormatsInput): ContentFormatDef[] {
  //throw new Error("not implemented yet");
  const excludedFormats = new Set(input.excludeFormatIds ?? [] ) ;


  const availableF = input.availableFormats.filter(
    (f) => 
      f.active &&
      !excludedFormats.has(f.id) &&
      COMFORT_ORDER[f.requiresComfortLevel] <= COMFORT_ORDER[input.contentComfortLevel] &&
      (f.goalTags.length === 0 || f.goalTags.includes(input.goal))
  );


  const sorted = [...availableF].sort((a,b) => compareByFreshness(a, b, input.recentlyUsedFormatIds))

  return sorted.slice(0, input.count)
   

}
