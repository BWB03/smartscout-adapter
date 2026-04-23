import { z } from "zod";

export const SmartScoutFiltersSchema = z.record(z.unknown());

export const PagingSchema = z
  .object({
    nextPageId: z.string().nullable().optional(),
    hasMoreRecords: z.boolean(),
  })
  .passthrough();

export const pagedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z
    .object({
      dataCount: z.number().optional(),
      paging: PagingSchema.optional(),
      data: z.array(itemSchema).nullable().optional(),
    })
    .passthrough();

export const BrandSchema = z
  .object({
    amazonIsr: z.number().nullable().optional(),
    avgFbaSellers: z.number().nullable().optional(),
    avgSellers: z.number().nullable().optional(),
    avgPrice: z.number().nullable().optional(),
    avgVolume: z.number().nullable().optional(),
    reviewRating: z.number().nullable().optional(),
    totalProducts: z.number().int().nullable().optional(),
    totalReviews: z.number().int().nullable().optional(),
    monthlyRevenue: z.number().nullable().optional(),
    monthlyUnitsSold: z.number().int().nullable().optional(),
    brandScore: z.number().nullable().optional(),
    hasStorefront: z.boolean().optional(),
    storefrontUrl: z.string().nullable().optional(),
    hasSingleSeller: z.boolean().optional(),
    dominantSellerProfileId: z.number().int().nullable().optional(),
    dominantSellerBrandCoverage: z.number().nullable().optional(),
    brandName: z.string().nullable().optional(),
    categoryName: z.string().nullable().optional(),
    subcategoryName: z.string().nullable().optional(),
    subcategoryId: z.number().nullable().optional(),
    monthGrowth: z.number().nullable().optional(),
    monthGrowth12: z.number().nullable().optional(),
    trailing12Months: z.number().nullable().optional(),
  })
  .passthrough();

export const BrandCoverageSchema = z
  .object({
    numberOffers: z.number().int().nullable().optional(),
    monthlyRevenue: z.number().nullable().optional(),
    estimateBrandPercentage: z.number().nullable().optional(),
    amazonSellerId: z.string().nullable().optional(),
    brandName: z.string().nullable().optional(),
  })
  .passthrough();

export const SubcategoryBrandSchema = z
  .object({
    brandName: z.string().nullable().optional(),
    subcategoryName: z.string().nullable().optional(),
    subcategoryContext: z.string().nullable().optional(),
    numberASINs: z.number().int().nullable().optional(),
    revenue: z.number().nullable().optional(),
    totalReviews: z.number().int().nullable().optional(),
    reviewRating: z.number().nullable().optional(),
    avgPrice: z.number().nullable().optional(),
    avgNumberSellers: z.number().nullable().optional(),
    avgPageScore: z.number().nullable().optional(),
    avgVolume: z.number().nullable().optional(),
    avgReviews: z.number().nullable().optional(),
    totalNumberUnitsSold: z.number().int().nullable().optional(),
    marketshare: z.number().nullable().optional(),
    moMMktShareChange: z.number().nullable().optional(),
    moMMonthlyUnitsChange: z.number().int().nullable().optional(),
    moMMonthlyRevChange: z.number().nullable().optional(),
    adSpendShare: z.number().nullable().optional(),
  })
  .passthrough();

export const ProductSchema = z
  .object({
    subcategoryId: z.number().nullable().optional(),
    asin: z.string().nullable().optional(),
    rank: z.number().int().nullable().optional(),
    subcategoryRank: z.number().int().nullable().optional(),
    numberOfSellers: z.number().int().nullable().optional(),
    buyBoxPrice: z.number().nullable().optional(),
    averageBuyBoxPrice: z.number().nullable().optional(),
    reviewCount: z.number().int().nullable().optional(),
    reviewRating: z.number().nullable().optional(),
    numberFbaSellers: z.number().int().nullable().optional(),
    amazonIsr: z.number().nullable().optional(),
    monthlyRevenueEstimate: z.number().nullable().optional(),
    monthlyUnitsSold: z.number().int().nullable().optional(),
    amzMonthlySold: z.number().int().nullable().optional(),
    outOfStockNow: z.boolean().optional(),
    productPageScore: z.number().nullable().optional(),
    isVariation: z.boolean().optional(),
    parentAsin: z.string().nullable().optional(),
    imageCount: z.number().int().nullable().optional(),
    imageUrl: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    buyBoxEquity: z.number().nullable().optional(),
    revenueEquity: z.number().nullable().optional(),
    marginEquity: z.number().nullable().optional(),
    upc: z.string().nullable().optional(),
    listedSince: z.string().nullable().optional(),
    subcategoryName: z.string().nullable().optional(),
    categoryName: z.string().nullable().optional(),
    brandName: z.string().nullable().optional(),
    ttmRevenue: z.number().nullable().optional(),
  })
  .passthrough();

export const ProductHistorySchema = z
  .object({
    date: z.string(),
    newFbmPrice: z.number().nullable().optional(),
    newFbaPrice: z.number().nullable().optional(),
    salesRank: z.number().nullable().optional(),
    buyBoxPrice: z.number().nullable().optional(),
    reviewsCount: z.number().nullable().optional(),
    newOfferCount: z.number().nullable().optional(),
    amazonPrice: z.number().nullable().optional(),
    rankScore: z.number().int().nullable().optional(),
  })
  .passthrough();

export const SellerSchema = z
  .object({
    businessName: z.string().nullable().optional(),
    amazonSellerId: z.string().nullable().optional(),
    estimateSales: z.number().nullable().optional(),
    avgPrice: z.number().nullable().optional(),
    percentFba: z.number().nullable().optional(),
    numberReviewsLifetime: z.number().int().nullable().optional(),
    numberReviews30Days: z.number().int().nullable().optional(),
    numberWinningBrands: z.number().int().nullable().optional(),
    numberAsins: z.number().int().nullable().optional(),
    numberTopAsins: z.number().int().nullable().optional(),
    street: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    zipCode: z.string().nullable().optional(),
    numBrands1000: z.number().int().nullable().optional(),
    moMGrowth: z.number().nullable().optional(),
    threeMonthGrowth: z.number().nullable().optional(),
    sixMonthGrowth: z.number().nullable().optional(),
    yearGrowth: z.number().nullable().optional(),
    moMGrowthCount: z.number().int().nullable().optional(),
    sixMonthGrowthCount: z.number().int().nullable().optional(),
    isSuspended: z.boolean().optional(),
    lastSuspendedDate: z.string().nullable().optional(),
    startedSellingDate: z.string().nullable().optional(),
    sellerName: z.string().nullable().optional(),
    categoryName: z.string().nullable().optional(),
    subcategoryName: z.string().nullable().optional(),
  })
  .passthrough();

export const SubcategorySchema = z
  .object({
    id: z.number(),
    subcategoryName: z.string().nullable().optional(),
    totalMonthlyRevenue: z.number().nullable().optional(),
    totalBrands: z.number().int().nullable().optional(),
    totalAsins: z.number().int().nullable().optional(),
    avgPrice: z.number().nullable().optional(),
    avgReviews: z.number().nullable().optional(),
    avgRating: z.number().nullable().optional(),
    avgNumberSellers: z.number().nullable().optional(),
    avgPageScore: z.number().nullable().optional(),
    avgVolume: z.number().nullable().optional(),
    totalNumberUnitsSold: z.number().nullable().optional(),
    totalReviews: z.number().nullable().optional(),
    subcategoryContextName: z.string().nullable().optional(),
    sellerRevenuePct: z.number().nullable().optional(),
    azRevenuePct: z.number().nullable().optional(),
    avgListedSinceDays: z.number().int().nullable().optional(),
    ttm: z.number().nullable().optional(),
    isParent: z.boolean().nullable().optional(),
    level: z.number().int().nullable().optional(),
    isLeafNode: z.boolean().optional(),
    parentId: z.number().optional(),
    monthGrowth: z.number().nullable().optional(),
    monthGrowth12: z.number().nullable().optional(),
  })
  .passthrough();

export const SearchTermSchema = z
  .object({
    searchTermValue: z.string().nullable().optional(),
    estimateSearches: z.number().int().nullable().optional(),
    superCharge: z.boolean().optional(),
    brands: z.number().int().nullable().optional(),
    products: z.number().int().nullable().optional(),
    estimatedCpc: z.number().nullable().optional(),
    conversionShareTop3Total: z.number().nullable().optional(),
    clickShare1: z.number().nullable().optional(),
    clickShare2: z.number().nullable().optional(),
    clickShare3: z.number().nullable().optional(),
    rankingProducts: z.number().int().nullable().optional(),
    rankingBrands: z.number().int().nullable().optional(),
    estimateSearchesGrowth12Months: z.number().int().nullable().optional(),
    estimateSearchesGrowth6Months: z.number().int().nullable().optional(),
    estimateSearchesGrowth3Months: z.number().int().nullable().optional(),
    estimateSearchesGrowth1Month: z.number().int().nullable().optional(),
  })
  .passthrough();

export const RelevantProductSchema = z
  .object({
    asin: z.string().nullable().optional(),
    brand: z.string().nullable().optional(),
    commonSearchTerms: z.number().int(),
    relevancyScore: z.number(),
  })
  .passthrough();

export const RelevantSearchTermSchema = z
  .object({
    searchTerm: z.string().nullable().optional(),
    estimateSearches: z.number().int(),
    relevancy: z.number(),
    intent: z.string().nullable().optional(),
  })
  .passthrough();

export const SalesEstimateSchema = z
  .object({
    estimated30DaySalesVelocity: z.number().int().nullable().optional(),
  })
  .passthrough();

export const SearchBrandsResponseSchema = pagedResponseSchema(BrandSchema);
export const BrandMarketShareResponseSchema = pagedResponseSchema(SubcategoryBrandSchema);
export const BrandSellersResponseSchema = pagedResponseSchema(BrandCoverageSchema);
export const SearchProductsResponseSchema = pagedResponseSchema(ProductSchema);
export const ProductHistoryResponseSchema = pagedResponseSchema(ProductHistorySchema);
export const SearchSellersResponseSchema = pagedResponseSchema(SellerSchema);
export const SellerBrandsResponseSchema = pagedResponseSchema(BrandCoverageSchema);
export const SearchSubcategoriesResponseSchema = pagedResponseSchema(SubcategorySchema);
export const SubcategoryBrandsResponseSchema = pagedResponseSchema(SubcategoryBrandSchema);
export const SearchTermsResponseSchema = pagedResponseSchema(SearchTermSchema);
export const RelevantProductsResponseSchema = pagedResponseSchema(RelevantProductSchema);
export const RelevantSearchTermsResponseSchema = pagedResponseSchema(RelevantSearchTermSchema);
export const SalesEstimateResponseSchema = SalesEstimateSchema;
