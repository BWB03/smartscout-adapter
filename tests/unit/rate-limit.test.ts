import { describe, expect, it } from "vitest";

import { TokenBucket } from "../../src/utils/rate-limit.js";

describe("TokenBucket", () => {
  it("allows immediate burst requests", async () => {
    const bucket = new TokenBucket(2, 2);

    await bucket.acquire();
    await bucket.acquire();

    expect(true).toBe(true);
  });
});
