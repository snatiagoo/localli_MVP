import type { Goal } from "./goals";
import type { ComfortLevel, MediaType } from "@/lib/db/schema";


const COMFORT_ORDER: Record<ComfortLevel, number> = {
  photo_only: 0,
  simple_video: 1,
  confident_video: 2,
};


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


function freshnessScore(id: string, recentlyUsedFormatIds: string[]): number {
  const index = recentlyUsedFormatIds.indexOf(id);
  return index === -1 ? Infinity : index;
}


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