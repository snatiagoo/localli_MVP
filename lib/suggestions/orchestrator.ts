
import { mainFunction, creativeBrief } from "./generate-brief";
import { generateWeeklyFormats } from "./weekly-generation";
import { businesses, MediaType, suggestions} from "../db/schema";
import { db } from "../db";
import { BusinessForGeneration } from "./weekly-generation";
import z from "zod";
import { and, eq} from "drizzle-orm";


export type BriefWithPosition = {
  position: number;
  status: "ready" | "failed";
  shotList: z.infer<typeof creativeBrief>["shotList"];
  editingNotes: z.infer<typeof creativeBrief>["editingNotes"];
  caption: string;
  generationError?: string;
  formatId: string;
  mediaType: MediaType;
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

    currentDate.setDate(currentDate.getDate() - diff);

    return currentDate.toISOString().slice(0, 10);

    

}


export async function getExistingSuggestionsForWeek(businessId: string, weekStartDate: string){
  const existing = await db.select().from(suggestions)
        .where(
            and(
                eq(suggestions.weekStartDate, weekStartDate),
                eq(suggestions.businessId, businessId)
            )
        ) 
    ?? [];

    return existing;             
}


export async function getOrGenerateWeeklySuggestions(business: 
    typeof businesses.$inferSelect
){
  const weekStartDate = computeWeekStartDate();
  const businessId = business.id;
  const existing = await getExistingSuggestionsForWeek(businessId, weekStartDate);

  if(existing.length === 0){
    await getSuggestions(business);
    const res = await getExistingSuggestionsForWeek(businessId, weekStartDate)
    return res;
  }else{
    return existing;
  }


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



    for (const [index, format] of contentFormats.entries()){
        const formatId = format.id;
        const mediaType = format.mediaType;
        const position = index + 1;
        const startWeekDate = computeWeekStartDate();

        await saveSuggestion(formatId, business, mediaType, position, startWeekDate, false, null)
    }

    


}

export async function saveSuggestion(
    formatId: string, 
    business: typeof businesses.$inferSelect,
    mediaType: MediaType,
    position: number,
    startWeekDate: string,
    isRegen: boolean,
    regenerationId: string| null
){


    const res = (await mainFunction(formatId, business)).parsed_output;
    const suggestionList: BriefWithPosition[] = [];
        
        if(!res){
            suggestionList.push({
                position: position,
                status: "failed",
                shotList: [],
                editingNotes: null,
                caption: "",
                generationError: "Error parsing output",
                formatId: formatId,
                mediaType: mediaType,
                targetDurationSeconds: 0
            })
        }else{
            suggestionList.push({
                position: position,
                status: "ready",
                shotList: res.shotList,
                editingNotes: res.editingNotes,
                caption: res.caption,
                formatId: formatId,
                mediaType: mediaType,
                targetDurationSeconds: res.targetDurationSeconds
            })
        }

    


    for(const s of suggestionList){
        await db.insert(suggestions).values({
            businessId: business.id,
            formatId: s.formatId,
            mediaType: s.mediaType,
            weekStartDate: startWeekDate,
            position: s.position,
            targetDurationSeconds: s.targetDurationSeconds,
            shotList: s.shotList,
            editingNotes: s.editingNotes? s.editingNotes: null,
            caption: s.caption,
            status: s.status,
            generationError: s.generationError ? s.generationError : null,
            isRegeneration: isRegen,
            regeneratedFromSuggestionId: regenerationId,
        })
    }

}