import { describe, expect, it } from "vitest";
import { selectFormats, type ContentFormatDef } from "./format-selection";

// A small, fixed set of fake formats to test against — deliberately not the
// real seeded data, so these tests don't break if the real format library
// changes later. One of each interesting combination:
const FORMATS: ContentFormatDef[] = [
  {
    id: "photo_a",
    mediaType: "photo",
    goalTags: [], // universal — suits every goal
    requiresComfortLevel: "photo_only",
    active: true,
  },
  {
    id: "photo_b",
    mediaType: "photo",
    goalTags: ["more_walk_ins"],
    requiresComfortLevel: "photo_only",
    active: true,
  },
  {
    id: "video_a",
    mediaType: "video",
    goalTags: [], // universal
    requiresComfortLevel: "simple_video",
    active: true,
  },
  {
    id: "video_b",
    mediaType: "video",
    goalTags: ["more_brand_awareness"],
    requiresComfortLevel: "confident_video",
    active: true,
  },
  {
    id: "inactive_format",
    mediaType: "photo",
    goalTags: [],
    requiresComfortLevel: "photo_only",
    active: false, // retired — should never be selectable
  },
];

describe("selectFormats", () => {
  // WORKED EXAMPLE 1 — basic filtering + the alphabetical tiebreak.
  // A photo_only business can't do video_a/video_b (comfort too low), and
  // inactive_format is retired, so only photo_a and photo_b are eligible.
  // Neither has been used before, so both tie on freshness (Infinity) and
  // fall back to alphabetical order — hence this exact order is guaranteed.
  it("filters by comfort level and returns eligible formats in a deterministic order", () => {
    const result = selectFormats({
      goal: "more_walk_ins",
      contentComfortLevel: "photo_only",
      availableFormats: FORMATS,
      recentlyUsedFormatIds: [],
      count: 2,
    });

    expect(result.map((f) => f.id)).toEqual(["photo_a", "photo_b"]);
  });

  // WORKED EXAMPLE 2 — freshness ranking. Both photo_a and photo_b are
  // eligible again, but this time photo_a was used recently. A format
  // that's NEVER been used (photo_b) should always outrank one that has,
  // regardless of how long ago — this is the Infinity-vs-real-number
  // comparison the algorithm's comment warns about.
  it("ranks a never-used format above a recently-used one", () => {
    const result = selectFormats({
      goal: "more_walk_ins",
      contentComfortLevel: "photo_only",
      availableFormats: FORMATS,
      recentlyUsedFormatIds: ["photo_a"],
      count: 1,
    });

    expect(result.map((f) => f.id)).toEqual(["photo_b"]);
  });

  // TODO — write the remaining cases yourself. For each, think about: what
  // input would isolate this specific behavior, and what's the exact
  // expected output? Use the two examples above as a template
  // (selectFormats({...}) then expect(...).toEqual(...) or .toHaveLength(...)).

  // 1. A "confident_video" business should be ELIGIBLE for every comfort
  //    level (photo_only, simple_video, AND confident_video formats) — the
  //    ordering in COMFORT_ORDER means higher comfort unlocks everything
  //    below it too. Try count: 4 with contentComfortLevel: "confident_video"
  //    and goal: "more_brand_awareness" (so video_b's goal tag matches) —
  //    how many formats come back, and which ones?

  
  it("suggests any comfort level to confident_video businesses", () => {
    const result = selectFormats({
      goal: "more_brand_awareness",
      contentComfortLevel: "confident_video",
      availableFormats: FORMATS,
      recentlyUsedFormatIds: [],
      count: 4, // also tests for inactive format not showing
    });

    expect(result.map((f) => f.id)).toEqual(["photo_a", "video_a", "video_b"]);
  });


  // 2. Goal filtering: a format tagged for a goal the business does NOT
  //    have should be excluded, even if comfort level would allow it.
  //    (Hint: try goal: "more_reservations" — which formats have a
  //    goalTags list that does NOT include it and is NOT empty?)

  it("suggests only universal and matchign goal formats", () => {
    const result = selectFormats({
      goal: "more_reservations",
      contentComfortLevel: "confident_video",
      availableFormats: FORMATS,
      recentlyUsedFormatIds: [],
      count: 4,
    });

    expect(result.map((f) => f.id)).toEqual(["photo_a", "video_a"]);
  });
  

  // 3. excludeFormatIds (used by the regenerate feature later): passing a
  //    format's id in excludeFormatIds should remove exactly that format
  //    from the results, even if it would otherwise be the top choice.

  it("should exclude formats whose id is in excludeFormatIds", () => {
    const result = selectFormats({
      goal: "more_reservations",
      contentComfortLevel: "confident_video",
      availableFormats: FORMATS,
      recentlyUsedFormatIds: [],
      count: 4,
      excludeFormatIds: ["photo_a"]
    });

    expect(result.map((f) => f.id)).toEqual(["video_a"]);
  });

  // 4. The "degraded pool" case: ask for more formats (count) than are
  //    actually eligible given the filters. The function should return
  //    however many ARE eligible — fewer than requested — not throw an
  //    error or return something that violates comfort level.

  it("should return less than count if not enough possible formats", () => {
    const result = selectFormats({
      goal: "more_brand_awareness", // specific goal, so only that and universal
      contentComfortLevel: "photo_only",
      availableFormats: FORMATS,
      recentlyUsedFormatIds: [],
      count: 3, // we allow three but there is only 1 with photo only
    });

    expect(result.map((f) => f.id)).toEqual(["photo_a"]);
  });

  // 5. Determinism: call selectFormats with the exact same input object
  //    twice and confirm both results are identical. (This guards against
  //    any accidental randomness creeping into the algorithm later.)

  it("both results shoudl be identical if called with same input", () => {
    const result1 = selectFormats({
      goal: "more_brand_awareness", // specific goal, so only that and universal
      contentComfortLevel: "photo_only",
      availableFormats: FORMATS,
      recentlyUsedFormatIds: [],
      count: 3, // we allow three but there is only 1 with photo only
    });

    const result2 = selectFormats({
      goal: "more_brand_awareness", // specific goal, so only that and universal
      contentComfortLevel: "photo_only",
      availableFormats: FORMATS,
      recentlyUsedFormatIds: [],
      count: 3, // we allow three but there is only 1 with photo only
    });

    expect(result1).toEqual(result2);
  });


});
