// TODO — continue here tomorrow. Left to do / fix, in rough order:
//
// 1. BUG in computeWeekStartDate(): the setDate() call uses
//    `currentDate.getDay()` (day-of-WEEK, 0-6) instead of
//    `currentDate.getDate()` (day-of-MONTH, 1-31). setDate() expects the
//    day-of-month — using getDay() gives the wrong date whenever they don't
//    coincidentally match. Should be:
//    currentDate.setDate(currentDate.getDate() - diff);
//
// 2. BUG (currently the actual tsc error): shotList and editingNotes are
//    jsonb columns — Drizzle wants the plain JS value (array/object)
//    directly and serializes it itself. Don't JSON.stringify() them before
//    passing to .values(). Also: editingNotes' "nothing to save" case
//    should be `null` (matches the column's `{...} | null` type), not `[]`.
//
// 3. MISSING from the .values({...}) call: `mediaType` (it's .notNull() in
//    the schema, and s.mediaType already exists on every BriefWithPosition
//    entry — just wasn't added to the insert object yet).
//
// 4. MISSING from the .values({...}) call: `status`. Without it, every row
//    silently gets the column's default ("pending") regardless of whether
//    generation actually succeeded or failed — which throws away the whole
//    point of the ready/failed logic already built. Add `status: s.status`.
//
// 5. Minor/optional: generationError falls back to "" for the success case
//    — consider `null` instead, so a future `WHERE generation_error IS NOT
//    NULL` filter actually works as "only rows with a real error."
//
// 6. Not started yet: nothing calls getSuggestions() anywhere. Still need
//    to wire it into the dashboard page per the "auto-generate on page
//    load" decision — check if suggestions already exist for this
//    business+week first, only call getSuggestions() if none do.
//
// 7. Already deferred (tracked, not urgent): computeWeekStartDate()'s
//    toISOString() converts to UTC first, which can report the wrong day
//    right around midnight in a non-UTC timezone. Fine for now, revisit
//    during final-product polish.

import { mainFunction, creativeBrief } from "./generate-brief";
import { generateWeeklyFormats } from "./weekly-generation";
import { businesses, suggestions } from "../db/schema";
import { db } from "../db";
import { BusinessForGeneration } from "./weekly-generation";
import { ContentFormatDef } from "../content/format-selection";
import z from "zod";
import { NotNull } from "drizzle-orm";


type BriefWithPosition = {
  position: number;
  status: "ready" | "failed";
  shotList: z.infer<typeof creativeBrief>["shotList"];
  editingNotes: z.infer<typeof creativeBrief>["editingNotes"];
  caption: string;
  generationError?: string;
  formatId: string;
  mediaType: string;
  targetDurationSeconds: number | undefined
};


function computeWeekStartDate(){
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    let diff = 0;

    if( currentDay > 1){
        diff = currentDay - 1;
    }else if(currentDay === 0){
        diff = 6;
    }else{
        return currentDate.toISOString().slice(0, 10);
    }

    currentDate.setDate(currentDate.getDay() - diff);

    return currentDate.toISOString().slice(0, 10);

    

}



export async function getSuggestions(
    business: typeof businesses.$inferSelect
){
    const businessForGen: BusinessForGeneration = {
        id: business.id,
        category: business.category,
        goal: business.goal,
        contentComfortLevel: business.contentComfortLevel,
        postingFrequency: business.postingFrequency
    }

    const contentFormats = await generateWeeklyFormats(businessForGen);

    const suggestionList: BriefWithPosition[] = [];

    for (const [index, format] of contentFormats.entries()){
        const res = (await mainFunction(format.id, business)).parsed_output;
        if(!res){
            suggestionList.push({
                position: index + 1,
                status: "failed",
                shotList: [],
                editingNotes: null,
                caption: "",
                generationError: "Error parsing output",
                formatId: format.id,
                mediaType: format.mediaType,
                targetDurationSeconds: 0
            })
        }else{
            suggestionList.push({
                position: index + 1,
                status: "ready",
                shotList: res.shotList,
                editingNotes: res.editingNotes,
                caption: res.caption,
                formatId: format.id,
                mediaType: format.mediaType,
                targetDurationSeconds: res.targetDurationSeconds
            })
        }
        

    }

    const startWeekDate = computeWeekStartDate();


    for(const s of suggestionList){
        await db.insert(suggestions).values({
            businessId: business.id,
            formatId: s.formatId,
            weekStartDate: startWeekDate,
            position: s.position,
            targetDurationSeconds: s.targetDurationSeconds,
            shotList: JSON.stringify(s.shotList),
            editingNotes: s.editingNotes? JSON.stringify(s.editingNotes): [],
            caption: s.caption,
            generationError: s.generationError ? s.generationError : "",
            

            

        })
    }


}