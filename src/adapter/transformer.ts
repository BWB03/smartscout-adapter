import { ADAPTER_VERSION, SOURCE } from "../constants.js";
import type { UniversalEnvelope } from "../schema/universal.js";
import type { Pagination } from "../utils/pagination.js";

export function toUniversalEnvelope(
  dataType: string,
  data: unknown,
  opts?: {
    marketplace?: string | null;
    pagination?: Pagination;
  }
): UniversalEnvelope {
  return {
    source: SOURCE,
    adapter_version: ADAPTER_VERSION,
    data_type: dataType,
    marketplace: opts?.marketplace ?? null,
    retrieved_at: new Date().toISOString(),
    pagination: opts?.pagination,
    data,
  };
}

export function toErrorEnvelope(
  code: string,
  message: string,
  httpStatus?: number
): UniversalEnvelope {
  return {
    source: SOURCE,
    adapter_version: ADAPTER_VERSION,
    data_type: "error",
    retrieved_at: new Date().toISOString(),
    data: null,
    error: {
      code,
      message,
      http_status: httpStatus,
    },
  };
}

export function transformBrand(raw: {
  brandName?: string | null;
  categoryName?: string | null;
  subcategoryName?: string | null;
  subcategoryId?: number | null;
  monthlyRevenue?: number | null;
  monthlyUnitsSold?: number | null;
  avgPrice?: number | null;
  avgSellers?: number | null;
  avgFbaSellers?: number | null;
  amazonIsr?: number | null;
  reviewRating?: number | null;
  totalReviews?: number | null;
  totalProducts?: number | null;
  brandScore?: number | null;
  hasStorefront?: boolean;
  storefrontUrl?: string | null;
  hasSingleSeller?: boolean;
  dominantSellerProfileId?: number | null;
  dominantSellerBrandCoverage?: number | null;
  monthGrowth?: number | null;
  monthGrowth12?: number | null;
  trailing12Months?: number | null;
}) {
  return {
    brand_name: raw.brandName ?? null,
    category_name: raw.categoryName ?? null,
    subcategory_name: raw.subcategoryName ?? null,
    subcategory_id: raw.subcategoryId ?? null,
    monthly_revenue: raw.monthlyRevenue ?? null,
    monthly_units_sold: raw.monthlyUnitsSold ?? null,
    avg_price: raw.avgPrice ?? null,
    avg_sellers: raw.avgSellers ?? null,
    avg_fba_sellers: raw.avgFbaSellers ?? null,
    amazon_isr: raw.amazonIsr ?? null,
    review_rating: raw.reviewRating ?? null,
    total_reviews: raw.totalReviews ?? null,
    total_products: raw.totalProducts ?? null,
    brand_score: raw.brandScore ?? null,
    has_storefront: raw.hasStorefront ?? false,
    storefront_url: raw.storefrontUrl ?? null,
    has_single_seller: raw.hasSingleSeller ?? false,
    dominant_seller_profile_id: raw.dominantSellerProfileId ?? null,
    dominant_seller_brand_coverage: raw.dominantSellerBrandCoverage ?? null,
    month_growth: raw.monthGrowth ?? null,
    month_growth_12: raw.monthGrowth12 ?? null,
    trailing_12_months: raw.trailing12Months ?? null,
  };
}

export function transformBrandCoverage(raw: {
  brandName?: string | null;
  amazonSellerId?: string | null;
  numberOffers?: number | null;
  monthlyRevenue?: number | null;
  estimateBrandPercentage?: number | null;
}) {
  return {
    brand_name: raw.brandName ?? null,
    amazon_seller_id: raw.amazonSellerId ?? null,
    number_offers: raw.numberOffers ?? null,
    monthly_revenue: raw.monthlyRevenue ?? null,
    estimate_brand_percentage: raw.estimateBrandPercentage ?? null,
  };
}

export function transformSubcategoryBrand(raw: {
  brandName?: string | null;
  subcategoryName?: string | null;
  subcategoryContext?: string | null;
  numberASINs?: number | null;
  revenue?: number | null;
  totalReviews?: number | null;
  reviewRating?: number | null;
  avgPrice?: number | null;
  avgNumberSellers?: number | null;
  avgPageScore?: number | null;
  avgVolume?: number | null;
  avgReviews?: number | null;
  totalNumberUnitsSold?: number | null;
  marketshare?: number | null;
  moMMktShareChange?: number | null;
  moMMonthlyUnitsChange?: number | null;
  moMMonthlyRevChange?: number | null;
  adSpendShare?: number | null;
}) {
  return {
    brand_name: raw.brandName ?? null,
    subcategory_name: raw.subcategoryName ?? null,
    subcategory_context: raw.subcategoryContext ?? null,
    number_asins: raw.numberASINs ?? null,
    revenue: raw.revenue ?? null,
    total_reviews: raw.totalReviews ?? null,
    review_rating: raw.reviewRating ?? null,
    avg_price: raw.avgPrice ?? null,
    avg_number_sellers: raw.avgNumberSellers ?? null,
    avg_page_score: raw.avgPageScore ?? null,
    avg_volume: raw.avgVolume ?? null,
    avg_reviews: raw.avgReviews ?? null,
    total_number_units_sold: raw.totalNumberUnitsSold ?? null,
    market_share: raw.marketshare ?? null,
    month_over_month_market_share_change: raw.moMMktShareChange ?? null,
    month_over_month_monthly_units_change: raw.moMMonthlyUnitsChange ?? null,
    month_over_month_monthly_revenue_change: raw.moMMonthlyRevChange ?? null,
    ad_spend_share: raw.adSpendShare ?? null,
  };
}

export function transformProduct(raw: {
  asin?: string | null;
  title?: string | null;
  brandName?: string | null;
  categoryName?: string | null;
  subcategoryName?: string | null;
  subcategoryId?: number | null;
  rank?: number | null;
  subcategoryRank?: number | null;
  numberOfSellers?: number | null;
  buyBoxPrice?: number | null;
  averageBuyBoxPrice?: number | null;
  reviewCount?: number | null;
  reviewRating?: number | null;
  numberFbaSellers?: number | null;
  amazonIsr?: number | null;
  monthlyRevenueEstimate?: number | null;
  monthlyUnitsSold?: number | null;
  amzMonthlySold?: number | null;
  outOfStockNow?: boolean;
  productPageScore?: number | null;
  isVariation?: boolean;
  parentAsin?: string | null;
  imageCount?: number | null;
  imageUrl?: string | null;
  buyBoxEquity?: number | null;
  revenueEquity?: number | null;
  marginEquity?: number | null;
  upc?: string | null;
  listedSince?: string | null;
  ttmRevenue?: number | null;
}) {
  return {
    asin: raw.asin ?? null,
    title: raw.title ?? null,
    brand_name: raw.brandName ?? null,
    category_name: raw.categoryName ?? null,
    subcategory_name: raw.subcategoryName ?? null,
    subcategory_id: raw.subcategoryId ?? null,
    rank: raw.rank ?? null,
    subcategory_rank: raw.subcategoryRank ?? null,
    number_of_sellers: raw.numberOfSellers ?? null,
    buy_box_price: raw.buyBoxPrice ?? null,
    average_buy_box_price: raw.averageBuyBoxPrice ?? null,
    review_count: raw.reviewCount ?? null,
    review_rating: raw.reviewRating ?? null,
    number_fba_sellers: raw.numberFbaSellers ?? null,
    amazon_isr: raw.amazonIsr ?? null,
    monthly_revenue_estimate: raw.monthlyRevenueEstimate ?? null,
    monthly_units_sold: raw.monthlyUnitsSold ?? null,
    amazon_monthly_sold: raw.amzMonthlySold ?? null,
    out_of_stock_now: raw.outOfStockNow ?? false,
    product_page_score: raw.productPageScore ?? null,
    is_variation: raw.isVariation ?? false,
    parent_asin: raw.parentAsin ?? null,
    image_count: raw.imageCount ?? null,
    image_url: raw.imageUrl ?? null,
    buy_box_equity: raw.buyBoxEquity ?? null,
    revenue_equity: raw.revenueEquity ?? null,
    margin_equity: raw.marginEquity ?? null,
    upc: raw.upc ?? null,
    listed_since: raw.listedSince ?? null,
    ttm_revenue: raw.ttmRevenue ?? null,
  };
}

export function transformProductHistory(raw: {
  date: string;
  newFbmPrice?: number | null;
  newFbaPrice?: number | null;
  salesRank?: number | null;
  buyBoxPrice?: number | null;
  reviewsCount?: number | null;
  newOfferCount?: number | null;
  amazonPrice?: number | null;
  rankScore?: number | null;
}) {
  return {
    date: raw.date,
    new_fbm_price: raw.newFbmPrice ?? null,
    new_fba_price: raw.newFbaPrice ?? null,
    sales_rank: raw.salesRank ?? null,
    buy_box_price: raw.buyBoxPrice ?? null,
    reviews_count: raw.reviewsCount ?? null,
    new_offer_count: raw.newOfferCount ?? null,
    amazon_price: raw.amazonPrice ?? null,
    rank_score: raw.rankScore ?? null,
  };
}

export function transformSeller(raw: {
  sellerName?: string | null;
  businessName?: string | null;
  amazonSellerId?: string | null;
  estimateSales?: number | null;
  avgPrice?: number | null;
  percentFba?: number | null;
  numberReviewsLifetime?: number | null;
  numberReviews30Days?: number | null;
  numberWinningBrands?: number | null;
  numberAsins?: number | null;
  numberTopAsins?: number | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zipCode?: string | null;
  numBrands1000?: number | null;
  moMGrowth?: number | null;
  threeMonthGrowth?: number | null;
  sixMonthGrowth?: number | null;
  yearGrowth?: number | null;
  moMGrowthCount?: number | null;
  sixMonthGrowthCount?: number | null;
  isSuspended?: boolean;
  lastSuspendedDate?: string | null;
  startedSellingDate?: string | null;
  categoryName?: string | null;
  subcategoryName?: string | null;
}) {
  return {
    seller_name: raw.sellerName ?? null,
    business_name: raw.businessName ?? null,
    amazon_seller_id: raw.amazonSellerId ?? null,
    estimate_sales: raw.estimateSales ?? null,
    avg_price: raw.avgPrice ?? null,
    percent_fba: raw.percentFba ?? null,
    number_reviews_lifetime: raw.numberReviewsLifetime ?? null,
    number_reviews_30_days: raw.numberReviews30Days ?? null,
    number_winning_brands: raw.numberWinningBrands ?? null,
    number_asins: raw.numberAsins ?? null,
    number_top_asins: raw.numberTopAsins ?? null,
    street: raw.street ?? null,
    city: raw.city ?? null,
    state: raw.state ?? null,
    country: raw.country ?? null,
    zip_code: raw.zipCode ?? null,
    num_brands_1000: raw.numBrands1000 ?? null,
    month_over_month_growth: raw.moMGrowth ?? null,
    three_month_growth: raw.threeMonthGrowth ?? null,
    six_month_growth: raw.sixMonthGrowth ?? null,
    year_growth: raw.yearGrowth ?? null,
    month_over_month_growth_count: raw.moMGrowthCount ?? null,
    six_month_growth_count: raw.sixMonthGrowthCount ?? null,
    is_suspended: raw.isSuspended ?? false,
    last_suspended_date: raw.lastSuspendedDate ?? null,
    started_selling_date: raw.startedSellingDate ?? null,
    category_name: raw.categoryName ?? null,
    subcategory_name: raw.subcategoryName ?? null,
  };
}

export function transformSubcategory(raw: {
  id: number;
  subcategoryName?: string | null;
  totalMonthlyRevenue?: number | null;
  totalBrands?: number | null;
  totalAsins?: number | null;
  avgPrice?: number | null;
  avgReviews?: number | null;
  avgRating?: number | null;
  avgNumberSellers?: number | null;
  avgPageScore?: number | null;
  avgVolume?: number | null;
  totalNumberUnitsSold?: number | null;
  totalReviews?: number | null;
  subcategoryContextName?: string | null;
  sellerRevenuePct?: number | null;
  azRevenuePct?: number | null;
  avgListedSinceDays?: number | null;
  ttm?: number | null;
  isParent?: boolean | null;
  level?: number | null;
  isLeafNode?: boolean;
  parentId?: number;
  monthGrowth?: number | null;
  monthGrowth12?: number | null;
}) {
  return {
    id: raw.id,
    subcategory_name: raw.subcategoryName ?? null,
    total_monthly_revenue: raw.totalMonthlyRevenue ?? null,
    total_brands: raw.totalBrands ?? null,
    total_asins: raw.totalAsins ?? null,
    avg_price: raw.avgPrice ?? null,
    avg_reviews: raw.avgReviews ?? null,
    avg_rating: raw.avgRating ?? null,
    avg_number_sellers: raw.avgNumberSellers ?? null,
    avg_page_score: raw.avgPageScore ?? null,
    avg_volume: raw.avgVolume ?? null,
    total_number_units_sold: raw.totalNumberUnitsSold ?? null,
    total_reviews: raw.totalReviews ?? null,
    subcategory_context_name: raw.subcategoryContextName ?? null,
    seller_revenue_pct: raw.sellerRevenuePct ?? null,
    amazon_revenue_pct: raw.azRevenuePct ?? null,
    avg_listed_since_days: raw.avgListedSinceDays ?? null,
    trailing_twelve_months: raw.ttm ?? null,
    is_parent: raw.isParent ?? null,
    level: raw.level ?? null,
    is_leaf_node: raw.isLeafNode ?? false,
    parent_id: raw.parentId ?? null,
    month_growth: raw.monthGrowth ?? null,
    month_growth_12: raw.monthGrowth12 ?? null,
  };
}

export function transformSearchTerm(raw: {
  searchTermValue?: string | null;
  estimateSearches?: number | null;
  superCharge?: boolean;
  brands?: number | null;
  products?: number | null;
  estimatedCpc?: number | null;
  conversionShareTop3Total?: number | null;
  clickShare1?: number | null;
  clickShare2?: number | null;
  clickShare3?: number | null;
  rankingProducts?: number | null;
  rankingBrands?: number | null;
  estimateSearchesGrowth12Months?: number | null;
  estimateSearchesGrowth6Months?: number | null;
  estimateSearchesGrowth3Months?: number | null;
  estimateSearchesGrowth1Month?: number | null;
}) {
  return {
    search_term: raw.searchTermValue ?? null,
    estimate_searches: raw.estimateSearches ?? null,
    super_charge: raw.superCharge ?? false,
    brands: raw.brands ?? null,
    products: raw.products ?? null,
    estimated_cpc: raw.estimatedCpc ?? null,
    conversion_share_top_3_total: raw.conversionShareTop3Total ?? null,
    click_share_1: raw.clickShare1 ?? null,
    click_share_2: raw.clickShare2 ?? null,
    click_share_3: raw.clickShare3 ?? null,
    ranking_products: raw.rankingProducts ?? null,
    ranking_brands: raw.rankingBrands ?? null,
    estimate_searches_growth_12_months: raw.estimateSearchesGrowth12Months ?? null,
    estimate_searches_growth_6_months: raw.estimateSearchesGrowth6Months ?? null,
    estimate_searches_growth_3_months: raw.estimateSearchesGrowth3Months ?? null,
    estimate_searches_growth_1_month: raw.estimateSearchesGrowth1Month ?? null,
  };
}

export function transformRelevantProduct(raw: {
  asin?: string | null;
  brand?: string | null;
  commonSearchTerms: number;
  relevancyScore: number;
}) {
  return {
    asin: raw.asin ?? null,
    brand: raw.brand ?? null,
    common_search_terms: raw.commonSearchTerms,
    relevancy_score: raw.relevancyScore,
  };
}

export function transformRelevantSearchTerm(raw: {
  searchTerm?: string | null;
  estimateSearches: number;
  relevancy: number;
  intent?: string | null;
}) {
  return {
    search_term: raw.searchTerm ?? null,
    estimate_searches: raw.estimateSearches,
    relevancy: raw.relevancy,
    intent: raw.intent ?? null,
  };
}

export function transformSalesEstimate(raw: {
  estimated30DaySalesVelocity?: number | null;
}) {
  return {
    estimated_30_day_sales_velocity: raw.estimated30DaySalesVelocity ?? null,
  };
}
