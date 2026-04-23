import { describe, expect, it, vi } from "vitest";

import {
  estimateSales,
  getProductHistory,
  searchBrands,
} from "../../src/adapter/endpoints.js";

describe("smartscout endpoints", () => {
  it("searchBrands uses the v2 brands endpoint", async () => {
    const client = {
      post: vi.fn().mockResolvedValue({ data: [], paging: { hasMoreRecords: false } }),
    } as any;

    await searchBrands(
      client,
      { brandName: { type: "contains", filter: "Nike" } },
      { marketplace: "US", pageSize: 100 }
    );

    expect(client.post).toHaveBeenCalledWith(
      "/api/v2/brands/search",
      expect.anything(),
      { brandName: { type: "contains", filter: "Nike" } },
      expect.objectContaining({
        marketplace: "US",
        "page[size]": 100,
      })
    );
  });

  it("getProductHistory URL-encodes ASINs", async () => {
    const client = {
      get: vi.fn().mockResolvedValue({ data: [], paging: { hasMoreRecords: false } }),
    } as any;

    await getProductHistory(client, "B00/ABC", { marketplace: "US" });

    expect(client.get).toHaveBeenCalledWith(
      "/api/v1/products/B00%2FABC/history",
      expect.anything(),
      expect.objectContaining({ marketplace: "US" })
    );
  });

  it("estimateSales sends category node and sales rank as query params", async () => {
    const client = { get: vi.fn().mockResolvedValue({ estimated30DaySalesVelocity: 123 }) } as any;

    await estimateSales(client, { categoryNode: 1234, salesRank: 25, marketplace: "US" });

    expect(client.get).toHaveBeenCalledWith(
      "/api/v1/sales/estimate",
      expect.anything(),
      {
        marketplace: "US",
        categoryNode: 1234,
        salesRank: 25,
      }
    );
  });
});
