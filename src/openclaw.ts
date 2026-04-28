import { SmartScoutClient, SmartScoutApiError } from "./adapter/client.js";
import { SmartScoutValidationError } from "./adapter/validation.js";
import {
  estimateSales,
  getBrandMarketShare,
  getBrandSellers,
  getProductHistory,
  getRelevantProducts,
  getRelevantSearchTerms,
  getSellerBrands,
  getSubcategoryBrands,
  searchBrands,
  searchProducts,
  searchSellers,
  searchSubcategories,
  searchTerms,
  type SearchOptions,
} from "./adapter/endpoints.js";
import {
  toErrorEnvelope,
  toUniversalEnvelope,
  transformBrand,
  transformBrandCoverage,
  transformProduct,
  transformProductHistory,
  transformRelevantProduct,
  transformRelevantSearchTerm,
  transformSalesEstimate,
  transformSearchTerm,
  transformSeller,
  transformSubcategory,
  transformSubcategoryBrand,
} from "./adapter/transformer.js";
import { extractPagination } from "./utils/pagination.js";
import type { UniversalEnvelope } from "./schema/universal.js";

export class SmartScoutSkill {
  private client: SmartScoutClient;

  constructor(apiKey?: string) {
    this.client = new SmartScoutClient({ apiKey });
  }

  private handleError(err: unknown): UniversalEnvelope {
    if (err instanceof SmartScoutApiError) {
      return toErrorEnvelope(
        `smartscout_${err.httpStatus}`,
        err.message,
        err.httpStatus
      );
    }
    if (err instanceof SmartScoutValidationError) {
      return toErrorEnvelope("smartscout_validation", err.message, 400);
    }
    return toErrorEnvelope(
      "adapter_error",
      err instanceof Error ? err.message : "Unknown error"
    );
  }

  async searchBrands(
    filters?: Record<string, unknown>,
    opts?: SearchOptions
  ): Promise<UniversalEnvelope> {
    try {
      const raw = await searchBrands(this.client, filters, opts);
      return toUniversalEnvelope(
        "brand_summary",
        (raw.data ?? []).map(transformBrand),
        {
          marketplace: opts?.marketplace ?? null,
          pagination: extractPagination(raw, opts?.pageSize),
        }
      );
    } catch (err) {
      return this.handleError(err);
    }
  }

  async getBrandMarketShare(
    brandName: string,
    opts?: SearchOptions
  ): Promise<UniversalEnvelope> {
    try {
      const raw = await getBrandMarketShare(this.client, brandName, opts);
      return toUniversalEnvelope(
        "brand_market_share",
        (raw.data ?? []).map(transformSubcategoryBrand),
        {
          marketplace: opts?.marketplace ?? null,
          pagination: extractPagination(raw, opts?.pageSize),
        }
      );
    } catch (err) {
      return this.handleError(err);
    }
  }

  async getBrandSellers(
    brandName: string,
    opts?: SearchOptions
  ): Promise<UniversalEnvelope> {
    try {
      const raw = await getBrandSellers(this.client, brandName, opts);
      return toUniversalEnvelope(
        "brand_seller_coverage",
        (raw.data ?? []).map(transformBrandCoverage),
        {
          marketplace: opts?.marketplace ?? null,
          pagination: extractPagination(raw, opts?.pageSize),
        }
      );
    } catch (err) {
      return this.handleError(err);
    }
  }

  async searchProducts(
    filters?: Record<string, unknown>,
    opts?: SearchOptions
  ): Promise<UniversalEnvelope> {
    try {
      const raw = await searchProducts(this.client, filters, opts);
      return toUniversalEnvelope(
        "product_summary",
        (raw.data ?? []).map(transformProduct),
        {
          marketplace: opts?.marketplace ?? null,
          pagination: extractPagination(raw, opts?.pageSize),
        }
      );
    } catch (err) {
      return this.handleError(err);
    }
  }

  async getProductHistory(
    asin: string,
    opts?: SearchOptions
  ): Promise<UniversalEnvelope> {
    try {
      const raw = await getProductHistory(this.client, asin, opts);
      return toUniversalEnvelope(
        "product_history",
        (raw.data ?? []).map(transformProductHistory),
        {
          marketplace: opts?.marketplace ?? null,
          pagination: extractPagination(raw, opts?.pageSize),
        }
      );
    } catch (err) {
      return this.handleError(err);
    }
  }

  async searchSellers(
    filters?: Record<string, unknown>,
    opts?: SearchOptions
  ): Promise<UniversalEnvelope> {
    try {
      const raw = await searchSellers(this.client, filters, opts);
      return toUniversalEnvelope(
        "seller_summary",
        (raw.data ?? []).map(transformSeller),
        {
          marketplace: opts?.marketplace ?? null,
          pagination: extractPagination(raw, opts?.pageSize),
        }
      );
    } catch (err) {
      return this.handleError(err);
    }
  }

  async getSellerBrands(
    amazonSellerId: string,
    opts?: SearchOptions
  ): Promise<UniversalEnvelope> {
    try {
      const raw = await getSellerBrands(this.client, amazonSellerId, opts);
      return toUniversalEnvelope(
        "seller_brand_coverage",
        (raw.data ?? []).map(transformBrandCoverage),
        {
          marketplace: opts?.marketplace ?? null,
          pagination: extractPagination(raw, opts?.pageSize),
        }
      );
    } catch (err) {
      return this.handleError(err);
    }
  }

  async searchSubcategories(
    filters?: Record<string, unknown>,
    opts?: SearchOptions
  ): Promise<UniversalEnvelope> {
    try {
      const raw = await searchSubcategories(this.client, filters, opts);
      return toUniversalEnvelope(
        "subcategory_summary",
        (raw.data ?? []).map(transformSubcategory),
        {
          marketplace: opts?.marketplace ?? null,
          pagination: extractPagination(raw, opts?.pageSize),
        }
      );
    } catch (err) {
      return this.handleError(err);
    }
  }

  async getSubcategoryBrands(
    subcategoryId: number,
    filters?: { brandName?: string },
    opts?: SearchOptions
  ): Promise<UniversalEnvelope> {
    try {
      const raw = await getSubcategoryBrands(this.client, subcategoryId, filters, opts);
      return toUniversalEnvelope(
        "subcategory_brand_coverage",
        (raw.data ?? []).map(transformSubcategoryBrand),
        {
          marketplace: opts?.marketplace ?? null,
          pagination: extractPagination(raw, opts?.pageSize),
        }
      );
    } catch (err) {
      return this.handleError(err);
    }
  }

  async searchTerms(
    filters?: Record<string, unknown>,
    opts?: SearchOptions
  ): Promise<UniversalEnvelope> {
    try {
      const raw = await searchTerms(this.client, filters, opts);
      return toUniversalEnvelope(
        "search_term_summary",
        (raw.data ?? []).map(transformSearchTerm),
        {
          marketplace: opts?.marketplace ?? null,
          pagination: extractPagination(raw, opts?.pageSize),
        }
      );
    } catch (err) {
      return this.handleError(err);
    }
  }

  async getRelevantProducts(
    asin: string,
    filters?: Record<string, unknown>,
    opts?: SearchOptions
  ): Promise<UniversalEnvelope> {
    try {
      const raw = await getRelevantProducts(this.client, asin, filters, opts);
      return toUniversalEnvelope(
        "relevant_products",
        (raw.data ?? []).map(transformRelevantProduct),
        {
          marketplace: opts?.marketplace ?? null,
          pagination: extractPagination(raw, opts?.pageSize),
        }
      );
    } catch (err) {
      return this.handleError(err);
    }
  }

  async getRelevantSearchTerms(
    asin: string,
    filters?: Record<string, unknown>,
    opts?: SearchOptions
  ): Promise<UniversalEnvelope> {
    try {
      const raw = await getRelevantSearchTerms(this.client, asin, filters, opts);
      return toUniversalEnvelope(
        "relevant_search_terms",
        (raw.data ?? []).map(transformRelevantSearchTerm),
        {
          marketplace: opts?.marketplace ?? null,
          pagination: extractPagination(raw, opts?.pageSize),
        }
      );
    } catch (err) {
      return this.handleError(err);
    }
  }

  async estimateSales(opts: {
    categoryNode?: number;
    salesRank?: number;
    marketplace?: SearchOptions["marketplace"];
  }): Promise<UniversalEnvelope> {
    try {
      const raw = await estimateSales(this.client, opts);
      return toUniversalEnvelope(
        "sales_estimate",
        transformSalesEstimate(raw),
        { marketplace: opts.marketplace ?? null }
      );
    } catch (err) {
      return this.handleError(err);
    }
  }
}
