import { describe, expect, it, vi } from "vitest";

import {
  estimateSales,
  getProductHistory,
  getSubcategoryBrands,
  searchBrands,
  searchProducts,
  searchSellers,
  searchTerms,
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
      expect.objectContaining({ marketplace: "US" }),
      expect.objectContaining({ timeoutMs: 90000 })
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

  it("rejects unsupported product filter keys before calling the API", async () => {
    const client = { post: vi.fn() } as any;

    await expect(
      searchProducts(client, { asinList: ["B001"] }, { marketplace: "US" })
    ).rejects.toThrow(/asinList/);

    expect(client.post).not.toHaveBeenCalled();
  });

  it("coerces bare asins arrays into SmartScout list-filter form", async () => {
    const client = {
      post: vi.fn().mockResolvedValue({ data: [], paging: { hasMoreRecords: false } }),
    } as any;

    await searchProducts(client, { asins: ["B001"] }, { marketplace: "US" });

    expect(client.post).toHaveBeenCalledWith(
      "/api/v1/products/search",
      expect.anything(),
      expect.objectContaining({
        asins: { filter: ["B001"] },
      }),
      expect.anything()
    );
  });

  it("rejects unsupported seller filter keys before calling the API", async () => {
    const client = { post: vi.fn() } as any;

    await expect(
      searchSellers(client, { sellerId: "A123" }, { marketplace: "US" })
    ).rejects.toThrow(/sellerId/);

    expect(client.post).not.toHaveBeenCalled();
  });

  it("rejects unsupported search-term filter keys before calling the API", async () => {
    const client = { post: vi.fn() } as any;

    await expect(
      searchTerms(client, { searchTerm: "collagen" }, { marketplace: "US" })
    ).rejects.toThrow(/searchTerm/);

    expect(client.post).not.toHaveBeenCalled();
  });

  it("rejects unsupported sort keys before calling the API", async () => {
    const client = { post: vi.fn() } as any;

    await expect(
      getSubcategoryBrands(client, 123, undefined, {
        marketplace: "US",
        sortBy: "monthlyRevenue",
      })
    ).rejects.toThrow(/monthlyRevenue/);

    expect(client.post).not.toHaveBeenCalled();
  });
});
