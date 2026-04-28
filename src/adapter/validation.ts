const PRODUCT_FILTER_KEYS = [
  "customSegmentId",
  "subcategoryId",
  "brandName",
  "categoryName",
  "subcategoryName",
  "subcategoryContextName",
  "rank",
  "monthlyRevenueEstimate",
  "amazonIsr",
  "numberOfSellers",
  "numberFbaSellers",
  "reviewCount",
  "reviewRating",
  "buyBoxPrice",
  "productPageScore",
  "outOfStockNow",
  "isVariation",
  "asins",
  "asin",
  "parentAsin",
  "title",
  "note",
  "upcs",
  "upc",
  "buyBoxEquity",
  "numberOfItems",
  "totalRatings",
  "listedSince",
];

const SELLER_FILTER_KEYS = [
  "customSegmentId",
  "categoryName",
  "subcategoryName",
  "amazonSellerId",
  "amazonSellerIds",
  "sellerNames",
  "businessNames",
  "includeProducts",
  "estimateSales",
  "sellerName",
  "percentFba",
  "numberWinningBrands",
  "numberAsins",
  "numberTopAsins",
  "numBrands1000",
  "moMGrowth",
  "threeMonthGrowth",
  "sixMonthGrowth",
  "yearGrowth",
  "moMGrowthCount",
  "sixMonthGrowthCount",
  "street",
  "city",
  "state",
  "country",
  "zipCode",
  "businessName",
  "numberReviewsLifetime",
  "numberReviews30Days",
  "isSuspended",
  "lastSuspendedDate",
];

const SEARCH_TERM_FILTER_KEYS = [
  "customSegmentId",
  "searchTermValue",
  "estimateSearches",
  "brands",
  "products",
  "estimatedCpc",
  "superCharge",
];

const BRAND_FILTER_KEYS = [
  "customSegmentId",
  "brandNames",
  "brandName",
  "amazonIsr",
  "avgSellers",
  "avgPrice",
  "avgVolume",
  "reviewRating",
  "totalReviews",
  "totalProducts",
  "avgFbaSellers",
  "brandScore",
  "monthlyRevenue",
  "note",
  "category",
  "categoryName",
  "subcategoryName",
  "subcategoryContextName",
  "subcategoryId",
  "hasStorefront",
  "searchTerms",
  "sponsoredProducts",
  "sponsoredBrandWinRate",
  "sponsoredVideoWinRate",
  "topSpotWinRate",
  "topGroupWinRate",
  "monthGrowth",
  "monthGrowth12",
  "trailing12Months",
];

const SUBCATEGORY_FILTER_KEYS = [
  "customSegmentId",
  "id",
  "ids",
  "parentId",
  "totalMonthlyRevenue",
  "totalBrands",
  "totalAsins",
  "avgPrice",
  "avgReviews",
  "avgRating",
  "azRevenuePct",
  "sellerRevenuePct",
  "avgNumberSellers",
  "avgPageScore",
  "avgVolume",
  "totalNumberUnitsSold",
  "totalReviews",
  "subcategoryContextName",
  "subcategoryName",
];

const RELEVANT_PRODUCT_FILTER_KEYS = [
  "parentAsin",
  "relevancyScore",
  "commonSearchTerms",
];

const RELEVANT_SEARCH_TERM_FILTER_KEYS = [
  "parentAsin",
  "searchTerm",
  "intent",
  "relevancy",
  "estimatedSearches",
];

const BRAND_SORT_KEYS = [
  "amazonIsr",
  "avgFbaSellers",
  "avgSellers",
  "avgPrice",
  "avgVolume",
  "brandName",
  "brandScore",
  "categoryName",
  "dominantSellerBrandCoverage",
  "dominantSellerProfileId",
  "hasSingleSeller",
  "hasStorefront",
  "monthGrowth",
  "monthGrowth12",
  "monthlyRevenue",
  "monthlyUnitsSold",
  "reviewRating",
  "storefrontUrl",
  "subcategoryId",
  "subcategoryName",
  "totalProducts",
  "totalReviews",
  "trailing12Months",
];

const BRAND_COVERAGE_SORT_KEYS = [
  "amazonSellerId",
  "brandName",
  "estimateBrandPercentage",
  "monthlyRevenue",
  "numberOffers",
];

const PRODUCT_SORT_KEYS = [
  "amazonIsr",
  "amzMonthlySold",
  "asin",
  "averageBuyBoxPrice",
  "brandName",
  "buyBoxEquity",
  "buyBoxPrice",
  "categoryName",
  "imageCount",
  "imageUrl",
  "isVariation",
  "listedSince",
  "marginEquity",
  "monthlyRevenueEstimate",
  "monthlyUnitsSold",
  "numberFbaSellers",
  "numberOfItems",
  "numberOfSellers",
  "outOfStockNow",
  "parentAsin",
  "productPageScore",
  "rank",
  "revenueEquity",
  "reviewCount",
  "reviewRating",
  "subcategoryId",
  "subcategoryName",
  "subcategoryRank",
  "title",
  "totalRatings",
  "ttmRevenue",
  "upc",
];

const PRODUCT_HISTORY_SORT_KEYS = [
  "date",
  "newFbmPrice",
  "newFbaPrice",
  "salesRank",
  "buyBoxPrice",
  "reviewsCount",
  "newOfferCount",
  "amazonPrice",
  "rankScore",
];

const SELLER_SORT_KEYS = [
  "amazonSellerId",
  "avgPrice",
  "businessName",
  "categoryName",
  "city",
  "country",
  "estimateSales",
  "isSuspended",
  "lastSuspendedDate",
  "moMGrowth",
  "moMGrowthCount",
  "numBrands1000",
  "numberAsins",
  "numberReviews30Days",
  "numberReviewsLifetime",
  "numberTopAsins",
  "numberWinningBrands",
  "percentFba",
  "sellerName",
  "sixMonthGrowth",
  "sixMonthGrowthCount",
  "startedSellingDate",
  "state",
  "street",
  "subcategoryName",
  "threeMonthGrowth",
  "yearGrowth",
  "zipCode",
];

const SUBCATEGORY_SORT_KEYS = [
  "avgListedSinceDays",
  "avgNumberSellers",
  "avgPageScore",
  "avgPrice",
  "avgRating",
  "avgReviews",
  "avgVolume",
  "azRevenuePct",
  "id",
  "isLeafNode",
  "isParent",
  "level",
  "monthGrowth",
  "monthGrowth12",
  "parentId",
  "sellerRevenuePct",
  "subcategoryContextName",
  "subcategoryName",
  "totalAsins",
  "totalBrands",
  "totalMonthlyRevenue",
  "totalNumberUnitsSold",
  "totalReviews",
  "ttm",
];

const SUBCATEGORY_BRAND_SORT_KEYS = [
  "adSpendShare",
  "avgNumberSellers",
  "avgPageScore",
  "avgPrice",
  "avgReviews",
  "avgVolume",
  "brandName",
  "marketshare",
  "moMMktShareChange",
  "moMMonthlyRevChange",
  "moMMonthlyUnitsChange",
  "numberASINs",
  "revenue",
  "reviewRating",
  "subcategoryContext",
  "subcategoryName",
  "totalNumberUnitsSold",
  "totalReviews",
];

const SEARCH_TERM_SORT_KEYS = [
  "brands",
  "clickShare1",
  "clickShare2",
  "clickShare3",
  "conversionShareTop3Total",
  "estimateSearches",
  "estimateSearchesGrowth12Months",
  "estimateSearchesGrowth1Month",
  "estimateSearchesGrowth3Months",
  "estimateSearchesGrowth6Months",
  "estimatedCpc",
  "products",
  "rankingBrands",
  "rankingProducts",
  "searchTermValue",
  "superCharge",
];

const RELEVANT_PRODUCT_SORT_KEYS = [
  "asin",
  "brand",
  "commonSearchTerms",
  "relevancyScore",
];

const RELEVANT_SEARCH_TERM_SORT_KEYS = [
  "searchTerm",
  "estimateSearches",
  "relevancy",
  "intent",
];

class SmartScoutValidationError extends Error {
  readonly code = "validation_error";

  constructor(message: string) {
    super(message);
    this.name = "SmartScoutValidationError";
  }
}

function formatAllowedKeys(keys: readonly string[]): string {
  return keys.join(", ");
}

function formatSuggestions(
  badKeys: string[],
  suggestions?: Record<string, string>
): string {
  if (!suggestions) return "";
  const parts = badKeys
    .filter((key) => suggestions[key])
    .map((key) => `"${key}" -> "${suggestions[key]}"`);
  return parts.length ? ` Suggestions: ${parts.join(", ")}.` : "";
}

function validateFilterKeys(
  endpointName: string,
  filters: Record<string, unknown> | undefined,
  allowedKeys: readonly string[],
  suggestions?: Record<string, string>
) {
  if (!filters) return undefined;
  const badKeys = Object.keys(filters).filter((key) => !allowedKeys.includes(key));
  if (badKeys.length) {
    throw new SmartScoutValidationError(
      `Unsupported filter key(s) for ${endpointName}: ${badKeys.join(", ")}. Allowed keys: ${formatAllowedKeys(
        allowedKeys
      )}.${formatSuggestions(badKeys, suggestions)}`
    );
  }
  return filters;
}

function validateSortBy(
  endpointName: string,
  sortBy: string | undefined,
  allowedSortKeys: readonly string[]
) {
  if (!sortBy) return sortBy;
  if (!allowedSortKeys.includes(sortBy)) {
    throw new SmartScoutValidationError(
      `Unsupported sort_by for ${endpointName}: "${sortBy}". Allowed values: ${formatAllowedKeys(
        allowedSortKeys
      )}.`
    );
  }
  return sortBy;
}

export function validateBrandSearchFilters(filters?: Record<string, unknown>) {
  return validateFilterKeys("smartscout_search_brands", filters, BRAND_FILTER_KEYS);
}

export function validateProductSearchFilters(filters?: Record<string, unknown>) {
  return validateFilterKeys("smartscout_search_products", filters, PRODUCT_FILTER_KEYS, {
    asinList: "asins",
  });
}

export function validateSellerSearchFilters(filters?: Record<string, unknown>) {
  return validateFilterKeys("smartscout_search_sellers", filters, SELLER_FILTER_KEYS, {
    sellerId: "amazonSellerId",
    sellerIds: "amazonSellerIds",
  });
}

export function validateSubcategorySearchFilters(filters?: Record<string, unknown>) {
  return validateFilterKeys(
    "smartscout_search_subcategories",
    filters,
    SUBCATEGORY_FILTER_KEYS
  );
}

export function validateSearchTermFilters(filters?: Record<string, unknown>) {
  return validateFilterKeys("smartscout_search_terms", filters, SEARCH_TERM_FILTER_KEYS, {
    searchTerm: "searchTermValue",
  });
}

export function validateRelevantProductFilters(filters?: Record<string, unknown>) {
  return validateFilterKeys(
    "smartscout_get_relevant_products",
    filters,
    RELEVANT_PRODUCT_FILTER_KEYS
  );
}

export function validateRelevantSearchTermFilters(filters?: Record<string, unknown>) {
  return validateFilterKeys(
    "smartscout_get_relevant_search_terms",
    filters,
    RELEVANT_SEARCH_TERM_FILTER_KEYS
  );
}

export function validateSubcategoryBrandFilters(filters?: { brandName?: string }) {
  return filters;
}

export function validateBrandSort(sortBy?: string) {
  return validateSortBy("smartscout_search_brands", sortBy, BRAND_SORT_KEYS);
}

export function validateBrandMarketShareSort(sortBy?: string) {
  return validateSortBy("smartscout_get_brand_market_share", sortBy, SUBCATEGORY_BRAND_SORT_KEYS);
}

export function validateBrandSellerSort(sortBy?: string) {
  return validateSortBy("smartscout_get_brand_sellers", sortBy, BRAND_COVERAGE_SORT_KEYS);
}

export function validateProductSort(sortBy?: string) {
  return validateSortBy("smartscout_search_products", sortBy, PRODUCT_SORT_KEYS);
}

export function validateProductHistorySort(sortBy?: string) {
  return validateSortBy("smartscout_get_product_history", sortBy, PRODUCT_HISTORY_SORT_KEYS);
}

export function validateSellerSort(sortBy?: string) {
  return validateSortBy("smartscout_search_sellers", sortBy, SELLER_SORT_KEYS);
}

export function validateSellerBrandSort(sortBy?: string) {
  return validateSortBy("smartscout_get_seller_brands", sortBy, BRAND_COVERAGE_SORT_KEYS);
}

export function validateSubcategorySort(sortBy?: string) {
  return validateSortBy("smartscout_search_subcategories", sortBy, SUBCATEGORY_SORT_KEYS);
}

export function validateSubcategoryBrandSort(sortBy?: string) {
  return validateSortBy(
    "smartscout_get_subcategory_brands",
    sortBy,
    SUBCATEGORY_BRAND_SORT_KEYS
  );
}

export function validateSearchTermSort(sortBy?: string) {
  return validateSortBy("smartscout_search_terms", sortBy, SEARCH_TERM_SORT_KEYS);
}

export function validateRelevantProductSort(sortBy?: string) {
  return validateSortBy(
    "smartscout_get_relevant_products",
    sortBy,
    RELEVANT_PRODUCT_SORT_KEYS
  );
}

export function validateRelevantSearchTermSort(sortBy?: string) {
  return validateSortBy(
    "smartscout_get_relevant_search_terms",
    sortBy,
    RELEVANT_SEARCH_TERM_SORT_KEYS
  );
}

export { SmartScoutValidationError };
