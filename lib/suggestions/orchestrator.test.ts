import { it, describe, vi, expect, beforeEach } from "vitest"
import { generateWeeklyFormats } from "./weekly-generation";
import { getOrGenerateWeeklySuggestions } from "./orchestrator";
import { businesses } from "../db/schema";

const { mockWhere }  = vi.hoisted(()=> {
    return { mockWhere: vi.fn() };
})


vi.mock("../db", () => ({
    db: {
        select: vi.fn(() => ({
            from: vi.fn(() => ({
                where: mockWhere
            }))
        }))
    }
}))


// we do that so getSuggestions doesnt have to loop thorugh anythign
// and taht way it doesnt do all below it (saveSuggestion, which means:
// claude and db.insert)
vi.mock("./weekly-generation", () => ({
    generateWeeklyFormats: vi.fn().mockResolvedValue([])
}))






function fakeBusiness(overrides = {}) {
  return {
    onboardingCompletedAt: new Date(),
    subscriptionStatus: "active",
    name: "business_fake",
    goal: "goal",
    id: "business_1",
    category: "category",
    cuisine: "cuisine",
    ...overrides,
  };
}


function fakeSuggestion(overrides = {}){
    return {
    id: "id1",
    businessId: "business_1",
    formatId: "formatId",
    weekStartDate: "2026-09-14",
    position: 1,
    mediaType: "MediaType",
    targetDurationSeconds: 30,
    shotList: {
        order: 1,
        description: "description",
        },
    ...overrides,
    }
}




describe("It generates or gets suggestions for week", ()=> {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Generates when no suggestions exist this week", async ()=> {

        const business = fakeBusiness();
        mockWhere.mockResolvedValueOnce([]); // first check: nothing found this week
        mockWhere.mockResolvedValueOnce([]); // from the const res = getExistingSuggestions...

        await getOrGenerateWeeklySuggestions(business as typeof businesses.$inferSelect);

        // once inside the getSuggestions we call generateWeeklyFormats
        // it skips the remaining saveSuggestions thanks to the fact that we
        // mocked the resolved value of generateWeeklyFormats to []
        // so its ran but resolves to an empty list we cannot loop over 
        expect(generateWeeklyFormats).toHaveBeenCalled();
    });


    it("Returns available suggestions of this week", async ()=> {
        const business = fakeBusiness();
        mockWhere.mockResolvedValueOnce(
            [
                fakeSuggestion(),
                fakeSuggestion({id: "id2"}),
                fakeSuggestion({id: "id3"})
            ]
        );


        const res = await getOrGenerateWeeklySuggestions(business as typeof businesses.$inferSelect);

        expect(res).toEqual([
                fakeSuggestion(),
                fakeSuggestion({id: "id2"}),
                fakeSuggestion({id: "id3"})
            ])
        
            



    })



})