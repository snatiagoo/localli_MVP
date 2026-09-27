

import { describe, expect, it} from "vitest";
import { canRegenerate } from "./regenerate";

describe("regeneration rate limit tests", () => {

    it("Returns true if we are on a new week with all regens used previously", ()=>{
        const result = canRegenerate(3, "2026-09-14", "2026-09-21");

        expect(result).toBe(true);

    });




    it("Returns true if we are on a new week", ()=>{
        const result = canRegenerate(0, "2026-09-14", "2026-09-21");

        expect(result).toBe(true);

    });




    it("Returns true if current regens are below limit", ()=>{
        const result = canRegenerate(2, "2026-09-21", "2026-09-21");

        expect(result).toBe(true);

    });





    it("Returns false if regens are not below limit", ()=>{
        const result = canRegenerate(3, "2026-09-21", "2026-09-21");

        expect(result).toBe(false);

    });
})