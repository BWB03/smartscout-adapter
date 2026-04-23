import { z } from "zod";

export const PaginationSchema = z.object({
  next_page_id: z.string().nullable(),
  has_more_records: z.boolean(),
  data_count: z.number().nullable(),
  page_size: z.number().nullable(),
});

export const ErrorDetailSchema = z.object({
  code: z.string(),
  message: z.string(),
  http_status: z.number().optional(),
});

export const UniversalEnvelopeSchema = z.object({
  source: z.string(),
  adapter_version: z.string(),
  data_type: z.string(),
  marketplace: z.string().nullable().optional(),
  retrieved_at: z.string(),
  pagination: PaginationSchema.optional(),
  data: z.unknown(),
  error: ErrorDetailSchema.optional(),
});

export type UniversalEnvelope = z.infer<typeof UniversalEnvelopeSchema>;

export const BrandSummarySchema = z.object({
  brand_name: z.string().nullable().optional(),
  category_name: z.string().nullable().optional(),
  subcategory_name: z.string().nullable().optional(),
  subcategory_id: z.number().nullable().optional(),
  monthly_revenue: z.number().nullable().optional(),
  monthly_units_sold: z.number().nullable().optional(),
  avg_price: z.number().nullable().optional(),
  avg_sellers: z.number().nullable().optional(),
  avg_fba_sellers: z.number().nullable().optional(),
  amazon_isr: z.number().nullable().optional(),
  review_rating: z.number().nullable().optional(),
  total_reviews: z.number().nullable().optional(),
  total_products: z.number().nullable().optional(),
  brand_score: z.number().nullable().optional(),
  has_storefront: z.boolean().optional(),
  storefront_url: z.string().nullable().optional(),
  has_single_seller: z.boolean().optional(),
  dominant_seller_profile_id: z.number().nullable().optional(),
  dominant_seller_brand_coverage: z.number().nullable().optional(),
  month_growth: z.number().nullable().optional(),
  month_growth_12: z.number().nullable().optional(),
  trailing_12_months: z.number().nullable().optional(),
});

export const BrandCoverageSchema = z.object({
  brand_name: z.string().nullable().optional(),
  amazon_seller_id: z.string().nullable().optional(),
  number_offers: z.number().nullable().optional(),
  monthly_revenue: z.number().nullable().optional(),
  estimate_brand_percentage: z.number().nullable().optional(),
});

export const ProductSummarySchema = z.object({
  asin: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  brand_name: z.string().nullable().optional(),
  category_name: z.string().nullable().optional(),
  subcategory_name: z.string().nullable().optional(),
  subcategory_id: z.number().nullable().optional(),
  rank: z.number().nullable().optional(),
  subcategory_rank: z.number().nullable().optional(),
  number_of_sellers: z.number().nullable().optional(),
  buy_box_price: z.number().nullable().optional(),
  average_buy_box_price: z.number().nullable().optional(),
  review_count: z.number().nullable().optional(),
  review_rating: z.number().nullable().optional(),
  number_fba_sellers: z.number().nullable().optional(),
  amazon_isr: z.number().nullable().optional(),
  monthly_revenue_estimate: z.number().nullable().optional(),
  monthly_units_sold: z.number().nullable().optional(),
  amazon_monthly_sold: z.number().nullable().optional(),
  out_of_stock_now: z.boolean().optional(),
  product_page_score: z.number().nullable().optional(),
  is_variation: z.boolean().optional(),
  parent_asin: z.string().nullable().optional(),
  image_count: z.number().nullable().optional(),
  image_url: z.string().nullable().optional(),
  buy_box_equity: z.number().nullable().optional(),
  revenue_equity: z.number().nullable().optional(),
  margin_equity: z.number().nullable().optional(),
  upc: z.string().nullable().optional(),
  listed_since: z.string().nullable().optional(),
  ttm_revenue: z.number().nullable().optional(),
});

export const SellerSummarySchema = z.object({
  seller_name: z.string().nullable().optional(),
  business_name: z.string().nullable().optional(),
  amazon_seller_id: z.string().nullable().optional(),
  estimate_sales: z.number().nullable().optional(),
  avg_price: z.number().nullable().optional(),
  percent_fba: z.number().nullable().optional(),
  number_reviews_lifetime: z.number().nullable().optional(),
  number_reviews_30_days: z.number().nullable().optional(),
  number_winning_brands: z.number().nullable().optional(),
  number_asins: z.number().nullable().optional(),
  number_top_asins: z.number().nullable().optional(),
  street: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  zip_code: z.string().nullable().optional(),
  num_brands_1000: z.number().nullable().optional(),
  month_over_month_growth: z.number().nullable().optional(),
  three_month_growth: z.number().nullable().optional(),
  six_month_growth: z.number().nullable().optional(),
  year_growth: z.number().nullable().optional(),
  month_over_month_growth_count: z.number().nullable().optional(),
  six_month_growth_count: z.number().nullable().optional(),
  is_suspended: z.boolean().optional(),
  last_suspended_date: z.string().nullable().optional(),
  started_selling_date: z.string().nullable().optional(),
  category_name: z.string().nullable().optional(),
  subcategory_name: z.string().nullable().optional(),
});

export const SubcategorySummarySchema = z.object({
  id: z.number(),
  subcategory_name: z.string().nullable().optional(),
  total_monthly_revenue: z.number().nullable().optional(),
  total_brands: z.number().nullable().optional(),
  total_asins: z.number().nullable().optional(),
  avg_price: z.number().nullable().optional(),
  avg_reviews: z.number().nullable().optional(),
  avg_rating: z.number().nullable().optional(),
  avg_number_sellers: z.number().nullable().optional(),
  avg_page_score: z.number().nullable().optional(),
  avg_volume: z.number().nullable().optional(),
  total_number_units_sold: z.number().nullable().optional(),
  total_reviews: z.number().nullable().optional(),
  subcategory_context_name: z.string().nullable().optional(),
  seller_revenue_pct: z.number().nullable().optional(),
  amazon_revenue_pct: z.number().nullable().optional(),
  avg_listed_since_days: z.number().nullable().optional(),
  trailing_twelve_months: z.number().nullable().optional(),
  is_parent: z.boolean().nullable().optional(),
  level: z.number().nullable().optional(),
  is_leaf_node: z.boolean().optional(),
  parent_id: z.number().nullable().optional(),
  month_growth: z.number().nullable().optional(),
  month_growth_12: z.number().nullable().optional(),
});

export const SearchTermSummarySchema = z.object({
  search_term: z.string().nullable().optional(),
  estimate_searches: z.number().nullable().optional(),
  super_charge: z.boolean().optional(),
  brands: z.number().nullable().optional(),
  products: z.number().nullable().optional(),
  estimated_cpc: z.number().nullable().optional(),
  conversion_share_top_3_total: z.number().nullable().optional(),
  click_share_1: z.number().nullable().optional(),
  click_share_2: z.number().nullable().optional(),
  click_share_3: z.number().nullable().optional(),
  ranking_products: z.number().nullable().optional(),
  ranking_brands: z.number().nullable().optional(),
  estimate_searches_growth_12_months: z.number().nullable().optional(),
  estimate_searches_growth_6_months: z.number().nullable().optional(),
  estimate_searches_growth_3_months: z.number().nullable().optional(),
  estimate_searches_growth_1_month: z.number().nullable().optional(),
});

export const RelevantProductSchema = z.object({
  asin: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  common_search_terms: z.number().optional(),
  relevancy_score: z.number().optional(),
});

export const RelevantSearchTermSchema = z.object({
  search_term: z.string().nullable().optional(),
  estimate_searches: z.number().optional(),
  relevancy: z.number().optional(),
  intent: z.string().nullable().optional(),
});

export const ProductHistoryPointSchema = z.object({
  date: z.string(),
  new_fbm_price: z.number().nullable().optional(),
  new_fba_price: z.number().nullable().optional(),
  sales_rank: z.number().nullable().optional(),
  buy_box_price: z.number().nullable().optional(),
  reviews_count: z.number().nullable().optional(),
  new_offer_count: z.number().nullable().optional(),
  amazon_price: z.number().nullable().optional(),
  rank_score: z.number().nullable().optional(),
});

export const SalesEstimateSchema = z.object({
  estimated_30_day_sales_velocity: z.number().nullable().optional(),
});
