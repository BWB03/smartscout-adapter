import { ZodSchema } from "zod";
import { BASE_URL, DEFAULT_TIMEOUT_MS } from "../constants.js";
import { TokenBucket } from "../utils/rate-limit.js";

export class SmartScoutApiError extends Error {
  constructor(
    message: string,
    public readonly httpStatus: number,
    public readonly body?: unknown
  ) {
    super(message);
    this.name = "SmartScoutApiError";
  }
}

export class SmartScoutClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly bucket: TokenBucket;

  constructor(opts?: {
    apiKey?: string;
    baseUrl?: string;
    timeoutMs?: number;
    bucket?: TokenBucket;
  }) {
    this.apiKey = opts?.apiKey ?? process.env.SMARTSCOUT_API_KEY ?? "";
    if (!this.apiKey) {
      throw new Error(
        "SMARTSCOUT_API_KEY is required. Set it as an environment variable or pass it to the constructor."
      );
    }

    this.baseUrl = opts?.baseUrl ?? BASE_URL;
    this.timeoutMs =
      opts?.timeoutMs ??
      (Number(process.env.SMARTSCOUT_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS);
    this.bucket = opts?.bucket ?? new TokenBucket();
  }

  async get<T>(
    path: string,
    schema: ZodSchema<T>,
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    return this.request("GET", path, schema, undefined, params);
  }

  async post<T>(
    path: string,
    schema: ZodSchema<T>,
    body?: unknown,
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    return this.request("POST", path, schema, body, params);
  }

  private async request<T>(
    method: "GET" | "POST",
    path: string,
    schema: ZodSchema<T>,
    body?: unknown,
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    await this.bucket.acquire();

    const url = new URL(path, this.baseUrl);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value != null) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const res = await fetch(url.toString(), {
        method,
        headers: {
          "X-Api-Key": this.apiKey,
          ...(method === "POST" ? { "Content-Type": "application/json" } : {}),
        },
        body: method === "POST" && body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => undefined);
        throw new SmartScoutApiError(
          `SmartScout API ${res.status}: ${res.statusText}`,
          res.status,
          text
        );
      }

      const json = await res.json();
      return schema.parse(json);
    } catch (err) {
      if (err instanceof SmartScoutApiError) throw err;
      if (err instanceof Error && err.name === "AbortError") {
        throw new SmartScoutApiError(
          `SmartScout API request timed out after ${this.timeoutMs}ms`,
          408
        );
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }
}
