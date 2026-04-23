import { describe, expect, it } from "vitest";

import {
  transformBrand,
  transformProduct,
  transformSearchTerm,
} from "../../src/adapter/transformer.js";

describe("smartscout transformers", () => {
  it("normalizes brands into snake_case", () => {
    const transformed = transformBrand({
      brandName: "Nike",
      monthlyRevenue: 100000,
      avgPrice: 29.99,
    });

    expect(transformed).toEqual(
      expect.objectContaining({
        brand_name: "Nike",
        monthly_revenue: 100000,
        avg_price: 29.99,
      })
    );
  });

  it("normalizes products into snake_case", () => {
    const transformed = transformProduct({
      asin: "B001",
      brandName: "Nike",
      monthlyRevenueEstimate: 80000,
    });

    expect(transformed).toEqual(
      expect.objectContaining({
        asin: "B001",
        brand_name: "Nike",
        monthly_revenue_estimate: 80000,
      })
    );
  });

  it("normalizes search terms into snake_case", () => {
    const transformed = transformSearchTerm({
      searchTermValue: "collagen peptides",
      estimateSearches: 12000,
      estimatedCpc: 1.8,
    });

    expect(transformed).toEqual(
      expect.objectContaining({
        search_term: "collagen peptides",
        estimate_searches: 12000,
        estimated_cpc: 1.8,
      })
    );
  });
});
