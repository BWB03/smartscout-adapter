export const ADAPTER_VERSION = "1.0.0";
export const SOURCE = "smartscout";
export const BASE_URL = "https://api.smartscout.com";
export const DEFAULT_TIMEOUT_MS = 30_000;
export const DEFAULT_RATE_LIMIT_RPS = 2;
export const DEFAULT_RATE_LIMIT_BURST = 10;
export const DEFAULT_MARKETPLACE = "US";
export const MAX_PAGE_SIZE = 1000;
export const MARKETPLACES = [
  "US",
  "UK",
  "IT",
  "DE",
  "CA",
  "MX",
  "FR",
  "ES",
  "IN",
  "AU",
  "JP",
  "AE",
] as const;
export type Marketplace = (typeof MARKETPLACES)[number];
