import { z } from "zod";
import { GOAL_LABELS, type Goal } from "@/lib/content/goals";

// WORKED — z.enum() needs a non-empty tuple of exact string values, not a
// plain string[]. Rather than typing the 5 goal values out a second time
// here (which could drift out of sync with lib/content/goals.ts if a goal
// is ever added/renamed), we derive them from GOAL_LABELS's keys at
// runtime. The `as [Goal, ...Goal[]]` cast just tells TypeScript "trust me,
// this array is non-empty" — Object.keys() alone only returns a plain
// string[], which z.enum() won't accept.
const goalKeys = Object.keys(GOAL_LABELS) as [Goal, ...Goal[]];

// TODO — build the schema for the "basics" onboarding step (business name,
// cuisine, goal). Docs: https://zod.dev/api — see #objects, #strings,
// #optionals, #enums.
//
// z.object({ ... }) describes an object's shape; each field gets a
// "validator" — e.g. z.string() (must be a string), chained with .min(1)
// to require at least 1 character (i.e. reject an empty string), or
// .optional() to allow the field to be missing/undefined entirely.
//
//   - name: required string, at least 1 character
//   - cuisine: optional string (no minimum length needed)
//   - goal: use `z.enum(goalKeys)` (the array built above) — this checks
//     the value is EXACTLY one of the 5 real goal strings, nothing else
export const basicsSchema = z.object({});