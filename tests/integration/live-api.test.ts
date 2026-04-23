import { describe, expect, it } from "vitest";

import { SmartScoutClient } from "../../src/adapter/client.js";
import { searchBrands } from "../../src/adapter/endpoints.js";

const hasKey = Boolean(process.env.SMARTSCOUT_API_KEY);

describe.skipIf(!hasKey)("SmartScout live API", () => {
  it("can run a minimal brand search", async () => {
    const client = new SmartScoutClient();
    const result = await searchBrands(
      client,
      { brandName: { type: "contains", filter: "Nike" } },
      { marketplace: "US", pageSize: 1 }
    );

    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
  });
});
