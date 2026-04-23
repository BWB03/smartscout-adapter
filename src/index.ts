#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { DEFAULT_MARKETPLACE, MARKETPLACES, MAX_PAGE_SIZE } from "./constants.js";
import { SmartScoutClient, SmartScoutApiError } from "./adapter/client.js";
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

const client = new SmartScoutClient();
const server = new McpServer({
  name: "smartscout-adapter",
  version: "1.0.0",
});

const marketplaceArg = z
  .enum(MARKETPLACES)
  .optional()
  .describe(`SmartScout marketplace (default: ${DEFAULT_MARKETPLACE})`);
const pageIdArg = z.string().optional().describe("Cursor for the next page of results");
const pageSizeArg = z
  .number()
  .int()
  .min(1)
  .max(MAX_PAGE_SIZE)
  .optional()
  .describe(`Number of records to request (max: ${MAX_PAGE_SIZE})`);
const sortByArg = z.string().optional().describe("Field name to sort by");
const sortOrderArg = z.enum(["asc", "desc"]).optional().describe("Sort order");
const filtersArg = z
  .record(z.unknown())
  .optional()
  .describe("Raw SmartScout filter object matching the official request schema");

function errorResult(err: unknown) {
  const envelope =
    err instanceof SmartScoutApiError
      ? toErrorEnvelope(
          `smartscout_${err.httpStatus}`,
          err.message,
          err.httpStatus
        )
      : toErrorEnvelope(
          "adapter_error",
          err instanceof Error ? err.message : "Unknown error"
        );

  return {
    content: [{ type: "text" as const, text: JSON.stringify(envelope, null, 2) }],
    isError: true,
  };
}

function okResult(envelope: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(envelope, null, 2) }],
  };
}

server.tool(
  "smartscout_search_brands",
  "Search SmartScout brands using the official filter DSL. Returns brand metrics like revenue, seller density, review counts, and brand score.",
  {
    filters: filtersArg,
    marketplace: marketplaceArg,
    page_id: pageIdArg,
    page_size: pageSizeArg,
    sort_by: sortByArg,
    sort_order: sortOrderArg,
  },
  async ({ filters, marketplace, page_id, page_size, sort_by, sort_order }) => {
    try {
      const raw = await searchBrands(client, filters, {
        marketplace,
        pageId: page_id,
        pageSize: page_size,
        sortBy: sort_by,
        sortOrder: sort_order,
      });
      return okResult(
        toUniversalEnvelope("brand_summary", (raw.data ?? []).map(transformBrand), {
          marketplace: marketplace ?? DEFAULT_MARKETPLACE,
          pagination: extractPagination(raw, page_size),
        })
      );
    } catch (err) {
      return errorResult(err);
    }
  }
);

server.tool(
  "smartscout_get_brand_market_share",
  "Get a brand's subcategory market-share footprint from SmartScout.",
  {
    brand_name: z.string().describe("Brand name to look up"),
    marketplace: marketplaceArg,
    page_id: pageIdArg,
    page_size: pageSizeArg,
    sort_by: sortByArg,
    sort_order: sortOrderArg,
  },
  async ({ brand_name, marketplace, page_id, page_size, sort_by, sort_order }) => {
    try {
      const raw = await getBrandMarketShare(client, brand_name, {
        marketplace,
        pageId: page_id,
        pageSize: page_size,
        sortBy: sort_by,
        sortOrder: sort_order,
      });
      return okResult(
        toUniversalEnvelope(
          "brand_market_share",
          (raw.data ?? []).map(transformSubcategoryBrand),
          {
            marketplace: marketplace ?? DEFAULT_MARKETPLACE,
            pagination: extractPagination(raw, page_size),
          }
        )
      );
    } catch (err) {
      return errorResult(err);
    }
  }
);

server.tool(
  "smartscout_get_brand_sellers",
  "Get seller coverage for a specific brand from SmartScout.",
  {
    brand_name: z.string().describe("Brand name to look up"),
    marketplace: marketplaceArg,
    page_id: pageIdArg,
    page_size: pageSizeArg,
    sort_by: sortByArg,
    sort_order: sortOrderArg,
  },
  async ({ brand_name, marketplace, page_id, page_size, sort_by, sort_order }) => {
    try {
      const raw = await getBrandSellers(client, brand_name, {
        marketplace,
        pageId: page_id,
        pageSize: page_size,
        sortBy: sort_by,
        sortOrder: sort_order,
      });
      return okResult(
        toUniversalEnvelope(
          "brand_seller_coverage",
          (raw.data ?? []).map(transformBrandCoverage),
          {
            marketplace: marketplace ?? DEFAULT_MARKETPLACE,
            pagination: extractPagination(raw, page_size),
          }
        )
      );
    } catch (err) {
      return errorResult(err);
    }
  }
);

server.tool(
  "smartscout_search_products",
  "Search SmartScout products using the official filter DSL. Supports ASIN, brand, revenue, review, seller-count, and listing-level filters.",
  {
    filters: filtersArg,
    marketplace: marketplaceArg,
    page_id: pageIdArg,
    page_size: pageSizeArg,
    sort_by: sortByArg,
    sort_order: sortOrderArg,
  },
  async ({ filters, marketplace, page_id, page_size, sort_by, sort_order }) => {
    try {
      const raw = await searchProducts(client, filters, {
        marketplace,
        pageId: page_id,
        pageSize: page_size,
        sortBy: sort_by,
        sortOrder: sort_order,
      });
      return okResult(
        toUniversalEnvelope("product_summary", (raw.data ?? []).map(transformProduct), {
          marketplace: marketplace ?? DEFAULT_MARKETPLACE,
          pagination: extractPagination(raw, page_size),
        })
      );
    } catch (err) {
      return errorResult(err);
    }
  }
);

server.tool(
  "smartscout_get_product_history",
  "Get SmartScout historical price/rank/offer data for an ASIN.",
  {
    asin: z.string().describe("ASIN to fetch history for"),
    marketplace: marketplaceArg,
    page_id: pageIdArg,
    page_size: pageSizeArg,
    sort_by: sortByArg,
    sort_order: sortOrderArg,
  },
  async ({ asin, marketplace, page_id, page_size, sort_by, sort_order }) => {
    try {
      const raw = await getProductHistory(client, asin, {
        marketplace,
        pageId: page_id,
        pageSize: page_size,
        sortBy: sort_by,
        sortOrder: sort_order,
      });
      return okResult(
        toUniversalEnvelope(
          "product_history",
          (raw.data ?? []).map(transformProductHistory),
          {
            marketplace: marketplace ?? DEFAULT_MARKETPLACE,
            pagination: extractPagination(raw, page_size),
          }
        )
      );
    } catch (err) {
      return errorResult(err);
    }
  }
);

server.tool(
  "smartscout_search_sellers",
  "Search SmartScout sellers using the official filter DSL. Supports seller IDs, geography, growth, FBA mix, and review filters.",
  {
    filters: filtersArg,
    marketplace: marketplaceArg,
    page_id: pageIdArg,
    page_size: pageSizeArg,
    sort_by: sortByArg,
    sort_order: sortOrderArg,
  },
  async ({ filters, marketplace, page_id, page_size, sort_by, sort_order }) => {
    try {
      const raw = await searchSellers(client, filters, {
        marketplace,
        pageId: page_id,
        pageSize: page_size,
        sortBy: sort_by,
        sortOrder: sort_order,
      });
      return okResult(
        toUniversalEnvelope("seller_summary", (raw.data ?? []).map(transformSeller), {
          marketplace: marketplace ?? DEFAULT_MARKETPLACE,
          pagination: extractPagination(raw, page_size),
        })
      );
    } catch (err) {
      return errorResult(err);
    }
  }
);

server.tool(
  "smartscout_get_seller_brands",
  "Get brand coverage for a specific Amazon seller ID.",
  {
    amazon_seller_id: z.string().describe("Amazon seller ID to inspect"),
    marketplace: marketplaceArg,
    page_id: pageIdArg,
    page_size: pageSizeArg,
    sort_by: sortByArg,
    sort_order: sortOrderArg,
  },
  async ({ amazon_seller_id, marketplace, page_id, page_size, sort_by, sort_order }) => {
    try {
      const raw = await getSellerBrands(client, amazon_seller_id, {
        marketplace,
        pageId: page_id,
        pageSize: page_size,
        sortBy: sort_by,
        sortOrder: sort_order,
      });
      return okResult(
        toUniversalEnvelope(
          "seller_brand_coverage",
          (raw.data ?? []).map(transformBrandCoverage),
          {
            marketplace: marketplace ?? DEFAULT_MARKETPLACE,
            pagination: extractPagination(raw, page_size),
          }
        )
      );
    } catch (err) {
      return errorResult(err);
    }
  }
);

server.tool(
  "smartscout_search_subcategories",
  "Search SmartScout subcategories using the official filter DSL. Useful for market sizing and category discovery.",
  {
    filters: filtersArg,
    marketplace: marketplaceArg,
    page_id: pageIdArg,
    page_size: pageSizeArg,
    sort_by: sortByArg,
    sort_order: sortOrderArg,
  },
  async ({ filters, marketplace, page_id, page_size, sort_by, sort_order }) => {
    try {
      const raw = await searchSubcategories(client, filters, {
        marketplace,
        pageId: page_id,
        pageSize: page_size,
        sortBy: sort_by,
        sortOrder: sort_order,
      });
      return okResult(
        toUniversalEnvelope(
          "subcategory_summary",
          (raw.data ?? []).map(transformSubcategory),
          {
            marketplace: marketplace ?? DEFAULT_MARKETPLACE,
            pagination: extractPagination(raw, page_size),
          }
        )
      );
    } catch (err) {
      return errorResult(err);
    }
  }
);

server.tool(
  "smartscout_get_subcategory_brands",
  "Get brand coverage inside a SmartScout subcategory.",
  {
    subcategory_id: z.number().int().describe("SmartScout subcategory ID"),
    brand_name: z.string().optional().describe("Optional exact brand-name filter"),
    marketplace: marketplaceArg,
    page_id: pageIdArg,
    page_size: pageSizeArg,
    sort_by: sortByArg,
    sort_order: sortOrderArg,
  },
  async ({ subcategory_id, brand_name, marketplace, page_id, page_size, sort_by, sort_order }) => {
    try {
      const raw = await getSubcategoryBrands(
        client,
        subcategory_id,
        brand_name ? { brandName: brand_name } : undefined,
        {
          marketplace,
          pageId: page_id,
          pageSize: page_size,
          sortBy: sort_by,
          sortOrder: sort_order,
        }
      );
      return okResult(
        toUniversalEnvelope(
          "subcategory_brand_coverage",
          (raw.data ?? []).map(transformSubcategoryBrand),
          {
            marketplace: marketplace ?? DEFAULT_MARKETPLACE,
            pagination: extractPagination(raw, page_size),
          }
        )
      );
    } catch (err) {
      return errorResult(err);
    }
  }
);

server.tool(
  "smartscout_search_terms",
  "Search SmartScout search terms using the official filter DSL. Returns estimated search volume, CPC, and ranking concentration metrics.",
  {
    filters: filtersArg,
    marketplace: marketplaceArg,
    page_id: pageIdArg,
    page_size: pageSizeArg,
    sort_by: sortByArg,
    sort_order: sortOrderArg,
  },
  async ({ filters, marketplace, page_id, page_size, sort_by, sort_order }) => {
    try {
      const raw = await searchTerms(client, filters, {
        marketplace,
        pageId: page_id,
        pageSize: page_size,
        sortBy: sort_by,
        sortOrder: sort_order,
      });
      return okResult(
        toUniversalEnvelope(
          "search_term_summary",
          (raw.data ?? []).map(transformSearchTerm),
          {
            marketplace: marketplace ?? DEFAULT_MARKETPLACE,
            pagination: extractPagination(raw, page_size),
          }
        )
      );
    } catch (err) {
      return errorResult(err);
    }
  }
);

server.tool(
  "smartscout_get_relevant_products",
  "Get products that SmartScout considers relevant to an ASIN based on shared search-term behavior.",
  {
    asin: z.string().describe("Seed ASIN"),
    filters: filtersArg,
    marketplace: marketplaceArg,
    page_id: pageIdArg,
    page_size: pageSizeArg,
    sort_by: sortByArg,
    sort_order: sortOrderArg,
  },
  async ({ asin, filters, marketplace, page_id, page_size, sort_by, sort_order }) => {
    try {
      const raw = await getRelevantProducts(client, asin, filters, {
        marketplace,
        pageId: page_id,
        pageSize: page_size,
        sortBy: sort_by,
        sortOrder: sort_order,
      });
      return okResult(
        toUniversalEnvelope(
          "relevant_products",
          (raw.data ?? []).map(transformRelevantProduct),
          {
            marketplace: marketplace ?? DEFAULT_MARKETPLACE,
            pagination: extractPagination(raw, page_size),
          }
        )
      );
    } catch (err) {
      return errorResult(err);
    }
  }
);

server.tool(
  "smartscout_get_relevant_search_terms",
  "Get search terms SmartScout considers relevant to an ASIN.",
  {
    asin: z.string().describe("Seed ASIN"),
    filters: filtersArg,
    marketplace: marketplaceArg,
    page_id: pageIdArg,
    page_size: pageSizeArg,
    sort_by: sortByArg,
    sort_order: sortOrderArg,
  },
  async ({ asin, filters, marketplace, page_id, page_size, sort_by, sort_order }) => {
    try {
      const raw = await getRelevantSearchTerms(client, asin, filters, {
        marketplace,
        pageId: page_id,
        pageSize: page_size,
        sortBy: sort_by,
        sortOrder: sort_order,
      });
      return okResult(
        toUniversalEnvelope(
          "relevant_search_terms",
          (raw.data ?? []).map(transformRelevantSearchTerm),
          {
            marketplace: marketplace ?? DEFAULT_MARKETPLACE,
            pagination: extractPagination(raw, page_size),
          }
        )
      );
    } catch (err) {
      return errorResult(err);
    }
  }
);

server.tool(
  "smartscout_estimate_sales",
  "Estimate monthly sales velocity from a category node and sales rank.",
  {
    category_node: z.number().int().optional().describe("Amazon category node"),
    sales_rank: z.number().int().optional().describe("Sales rank inside the category node"),
    marketplace: marketplaceArg,
  },
  async ({ category_node, sales_rank, marketplace }) => {
    try {
      const raw = await estimateSales(client, {
        categoryNode: category_node,
        salesRank: sales_rank,
        marketplace,
      });
      return okResult(
        toUniversalEnvelope("sales_estimate", transformSalesEstimate(raw), {
          marketplace: marketplace ?? DEFAULT_MARKETPLACE,
        })
      );
    } catch (err) {
      return errorResult(err);
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
