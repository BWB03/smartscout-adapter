import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SmartScoutSkill } from "../../src/openclaw.js";

describe("SmartScoutSkill", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns a universal envelope for searchTerms", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          dataCount: 1,
          paging: { nextPageId: null, hasMoreRecords: false },
          data: [
            {
              searchTermValue: "collagen peptides",
              estimateSearches: 12000,
              superCharge: true,
            },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    const skill = new SmartScoutSkill("test-key");
    const result = await skill.searchTerms(
      { searchTermValue: { type: "contains", filter: "collagen" } },
      { marketplace: "US" }
    );

    expect(result.source).toBe("smartscout");
    expect(result.data_type).toBe("search_term_summary");
    expect(result.data).toEqual([
      expect.objectContaining({
        search_term: "collagen peptides",
        estimate_searches: 12000,
      }),
    ]);
  });
});
