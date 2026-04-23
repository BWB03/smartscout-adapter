import type { Marketplace } from "../constants.js";
import { DEFAULT_MARKETPLACE, MAX_PAGE_SIZE } from "../constants.js";
import { SmartScoutClient } from "./client.js";
import {
  BrandMarketShareResponseSchema,
  BrandSellersResponseSchema,
  ProductHistoryResponseSchema,
  RelevantProductsResponseSchema,
  RelevantSearchTermsResponseSchema,
  SalesEstimateResponseSchema,
  SearchBrandsResponseSchema,
  SearchProductsResponseSchema,
  SearchSellersResponseSchema,
  SearchSubcategoriesResponseSchema,
  SearchTermsResponseSchema,
  SellerBrandsResponseSchema,
  SmartScoutFiltersSchema,
  SubcategoryBrandsResponseSchema,
} from "../schema/smartscout.js";

export interface SearchOptions {
  marketplace?: Marketplace;
  pageId?: string;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

function toQuery(opts?: SearchOptions) {
  return {
    marketplace: opts?.marketplace ?? DEFAULT_MARKETPLACE,
    "page[id]": opts?.pageId,
    "page[size]": opts?.pageSize
      ? Math.min(Math.max(opts.pageSize, 1), MAX_PAGE_SIZE)
      : undefined,
    "sort[by]": opts?.sortBy,
    "sort[order]": opts?.sortOrder,
  };
}

export async function searchBrands(
  client: SmartScoutClient,
  filters?: Record<string, unknown>,
  opts?: SearchOptions
) {
  return client.post(
    "/api/v2/brands/search",
    SearchBrandsResponseSchema,
    SmartScoutFiltersSchema.parse(filters ?? {}),
    toQuery(opts)
  );
}

export async function getBrandMarketShare(
  client: SmartScoutClient,
  brandName: string,
  opts?: SearchOptions
) {
  return client.get("/api/v2/brands/market-share", BrandMarketShareResponseSchema, {
    ...toQuery(opts),
    brandName,
  });
}

export async function getBrandSellers(
  client: SmartScoutClient,
  brandName: string,
  opts?: SearchOptions
) {
  return client.get("/api/v2/brands/sellers", BrandSellersResponseSchema, {
    ...toQuery(opts),
    brandName,
  });
}

export async function searchProducts(
  client: SmartScoutClient,
  filters?: Record<string, unknown>,
  opts?: SearchOptions
) {
  return client.post(
    "/api/v1/products/search",
    SearchProductsResponseSchema,
    SmartScoutFiltersSchema.parse(filters ?? {}),
    toQuery(opts)
  );
}

export async function getProductHistory(
  client: SmartScoutClient,
  asin: string,
  opts?: SearchOptions
) {
  return client.get(
    `/api/v1/products/${encodeURIComponent(asin)}/history`,
    ProductHistoryResponseSchema,
    toQuery(opts)
  );
}

export async function searchSellers(
  client: SmartScoutClient,
  filters?: Record<string, unknown>,
  opts?: SearchOptions
) {
  return client.post(
    "/api/v1/sellers/search",
    SearchSellersResponseSchema,
    SmartScoutFiltersSchema.parse(filters ?? {}),
    toQuery(opts)
  );
}

export async function getSellerBrands(
  client: SmartScoutClient,
  amazonSellerId: string,
  opts?: SearchOptions
) {
  return client.get(
    `/api/v1/sellers/${encodeURIComponent(amazonSellerId)}/brands`,
    SellerBrandsResponseSchema,
    toQuery(opts)
  );
}

export async function searchSubcategories(
  client: SmartScoutClient,
  filters?: Record<string, unknown>,
  opts?: SearchOptions
) {
  return client.post(
    "/api/v1/subcategories/search",
    SearchSubcategoriesResponseSchema,
    SmartScoutFiltersSchema.parse(filters ?? {}),
    toQuery(opts)
  );
}

export async function getSubcategoryBrands(
  client: SmartScoutClient,
  subcategoryId: number,
  filters?: { brandName?: string },
  opts?: SearchOptions
) {
  return client.post(
    `/api/v1/subcategories/${subcategoryId}/brands`,
    SubcategoryBrandsResponseSchema,
    filters ?? {},
    toQuery(opts)
  );
}

export async function searchTerms(
  client: SmartScoutClient,
  filters?: Record<string, unknown>,
  opts?: SearchOptions
) {
  return client.post(
    "/api/v1/search-terms/search",
    SearchTermsResponseSchema,
    SmartScoutFiltersSchema.parse(filters ?? {}),
    toQuery(opts)
  );
}

export async function getRelevantProducts(
  client: SmartScoutClient,
  asin: string,
  filters?: Record<string, unknown>,
  opts?: SearchOptions
) {
  return client.post(
    `/api/v1/search-terms/relevant-products/${encodeURIComponent(asin)}`,
    RelevantProductsResponseSchema,
    SmartScoutFiltersSchema.parse(filters ?? {}),
    toQuery(opts)
  );
}

export async function getRelevantSearchTerms(
  client: SmartScoutClient,
  asin: string,
  filters?: Record<string, unknown>,
  opts?: SearchOptions
) {
  return client.post(
    `/api/v1/search-terms/relevant-search-terms/${encodeURIComponent(asin)}`,
    RelevantSearchTermsResponseSchema,
    SmartScoutFiltersSchema.parse(filters ?? {}),
    toQuery(opts)
  );
}

export async function estimateSales(
  client: SmartScoutClient,
  opts: {
    categoryNode?: number;
    salesRank?: number;
    marketplace?: Marketplace;
  }
) {
  return client.get("/api/v1/sales/estimate", SalesEstimateResponseSchema, {
    marketplace: opts.marketplace ?? DEFAULT_MARKETPLACE,
    categoryNode: opts.categoryNode,
    salesRank: opts.salesRank,
  });
}
