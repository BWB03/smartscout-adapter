import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SmartScoutClient, SmartScoutApiError } from "../../src/adapter/client.js";
import { SearchBrandsResponseSchema } from "../../src/schema/smartscout.js";

describe("SmartScoutClient", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    delete process.env.SMARTSCOUT_API_KEY;
  });

  it("throws when no API key is configured", () => {
    expect(() => new SmartScoutClient()).toThrow("SMARTSCOUT_API_KEY is required");
  });

  it("sends X-Api-Key and query params on GET", async () => {
    process.env.SMARTSCOUT_API_KEY = "test-key";
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          dataCount: 1,
          paging: { nextPageId: null, hasMoreRecords: false },
          data: [],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    const client = new SmartScoutClient();
    await client.get("/api/v2/brands/market-share", SearchBrandsResponseSchema, {
      marketplace: "US",
      brandName: "Nike",
      "page[size]": 10,
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    const [url, init] = vi.mocked(fetch).mock.calls[0]!;
    expect(String(url)).toContain("/api/v2/brands/market-share");
    expect(String(url)).toContain("brandName=Nike");
    expect(String(url)).toContain("page%5Bsize%5D=10");
    expect(init?.headers).toMatchObject({ "X-Api-Key": "test-key" });
  });

  it("raises SmartScoutApiError on non-2xx responses", async () => {
    process.env.SMARTSCOUT_API_KEY = "test-key";
    vi.mocked(fetch).mockResolvedValue(
      new Response("nope", { status: 401, statusText: "Unauthorized" })
    );

    const client = new SmartScoutClient();

    await expect(
      client.get("/api/v1/products/search", SearchBrandsResponseSchema, {
        marketplace: "US",
      })
    ).rejects.toBeInstanceOf(SmartScoutApiError);
  });
});
