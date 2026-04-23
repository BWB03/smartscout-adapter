import { describe, expect, it } from "vitest";

import {
  SearchProductsResponseSchema,
  SearchTermsResponseSchema,
} from "../../src/schema/smartscout.js";

describe("smartscout schemas", () => {
  it("parses paged product responses", () => {
    const parsed = SearchProductsResponseSchema.parse({
      dataCount: 1,
      paging: { nextPageId: "abc", hasMoreRecords: true },
      data: [{ asin: "B001", title: "Test Product" }],
    });

    expect(parsed.paging?.nextPageId).toBe("abc");
    expect(parsed.data?.[0]?.asin).toBe("B001");
  });

  it("parses search-term responses", () => {
    const parsed = SearchTermsResponseSchema.parse({
      dataCount: 1,
      paging: { nextPageId: null, hasMoreRecords: false },
      data: [{ searchTermValue: "vitamin c", estimateSearches: 5000 }],
    });

    expect(parsed.data?.[0]?.searchTermValue).toBe("vitamin c");
  });
});
