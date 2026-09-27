

import { describe, it, expect, vi, beforeEach } from "vitest";
import { requireActiveSubscription, requirePreviousOnboardingSteps } from "./dal";
import { redirect } from "next/navigation";

// hoisted lets it be before the vi.mock

// done like this instead of const mockWhere = vi.fn(), because
// the normal const vi vi.fn() woudl happen later, so we cant
// reference it inside the vi.mock() below
const { mockWhere } = vi.hoisted(() => {
    return { mockWhere : vi.fn()}
})

// Mocking the DB access
vi.mock("./db", ()=>({
    db: {
        select: vi.fn(() => ({
            from: vi.fn(() => ({
                where: mockWhere,
            }))
        }))
    }
}))

// mocking auth.protect() from clerk to get userID
vi.mock("@clerk/nextjs/server", () => ({
    auth: { protect: vi.fn().mockResolvedValue({ userId: "test-user-id" }) },
}));

// mocking the redirect function
vi.mock("next/navigation", () => ({redirect: vi.fn()}));
beforeEach(() => {
  vi.clearAllMocks();
});





function fakeBusiness(overrides = {}) {
  return {
    onboardingCompletedAt: new Date(),
    subscriptionStatus: "active",
    name: "business_fake",
    goal: "goal",
    ...overrides,
  };
}

describe("It redirects backwards on uncompleted onboarding steps", ()=> {
    
    it("Redirects on missing name", async () => {

        vi.mocked(redirect);

        mockWhere.mockResolvedValueOnce([fakeBusiness({name: undefined})]);

        await requirePreviousOnboardingSteps();


        expect(redirect).toHaveBeenCalledTimes(1);

    });






    it("Redirects on missing goal", async () => {
        vi.mocked(redirect);

        mockWhere.mockResolvedValueOnce([fakeBusiness({goal: undefined})]);

        await requirePreviousOnboardingSteps();



        expect(redirect).toHaveBeenCalled();

    });






    it("Redirects on missing business",async () => {
        vi.mocked(redirect);

        mockWhere.mockResolvedValueOnce([]);

        await requirePreviousOnboardingSteps();



        expect(redirect).toHaveBeenCalled();

    });


    it("Returns business if viable",async () => {
        const business = fakeBusiness();

        vi.mocked(redirect);
        mockWhere.mockResolvedValueOnce([business]);

        const res = await requirePreviousOnboardingSteps();



        expect(redirect).not.toHaveBeenCalled();
        expect(res).toEqual(business);

    });


});


describe("Requires active subscription or it redirects to paywall", () => {
    
    
    it("Redirects if subscription status is not active", async () => {
        vi.mocked(redirect);

        mockWhere.mockResolvedValueOnce([fakeBusiness({subscriptionStatus: "not active"})]);

        await requireActiveSubscription();
        expect(redirect).toHaveBeenCalledTimes(1);
    });


    it("Returns business and doesnt redirect if active", async () => {
        const business = fakeBusiness();
        vi.mocked(redirect);

        mockWhere.mockResolvedValueOnce([business]);

        const res = await requireActiveSubscription();
        expect(redirect).not.toHaveBeenCalled();
        expect(res).toEqual(business)
    });


})