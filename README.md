# SmartScout Adapter

> Brought to you by [SkillCrate](https://github.com/BWB03/skillcrate) — the open-source marketplace for Amazon seller agent skills.

Standalone MCP server + OpenClaw-style library wrapper for the official SmartScout API.

This repo follows the same adapter premise as `datadive-adapter`: normalize SmartScout responses into a consistent, agent-readable envelope so Claude, ChatGPT, Helm, or any MCP client can consume them predictably.

## Source Docs

- `https://www.smartscout.com/smartscout-api`
- `https://api.smartscout.com/index.html`
- `https://api.smartscout.com/swagger/api/swagger.json`

## Current Tool Surface

- `smartscout_search_brands`
- `smartscout_get_brand_market_share`
- `smartscout_get_brand_sellers`
- `smartscout_search_products`
- `smartscout_get_product_history`
- `smartscout_search_sellers`
- `smartscout_get_seller_brands`
- `smartscout_search_subcategories`
- `smartscout_get_subcategory_brands`
- `smartscout_search_terms`
- `smartscout_get_relevant_products`
- `smartscout_get_relevant_search_terms`
- `smartscout_estimate_sales`

## Quick Start

```bash
cd smartscout-adapter
npm install
npm run build
```

## Install Via Claude Desktop MCPB

The easiest Claude Desktop install path is the `.mcpb` bundle from GitHub Releases.

1. Download `smartscout-adapter-vX.Y.Z.mcpb` from the latest release.
2. Open the `.mcpb` file with Claude Desktop.
3. Enter your SmartScout API key when Claude asks for `SmartScout API Key`.
4. Enable or restart the extension if Claude Desktop prompts you.
5. Start a new Claude chat and confirm the SmartScout tools are available.

The bundle passes your key to the local MCP server as `SMARTSCOUT_API_KEY`. The adapter still runs locally; SmartScout API calls go to SmartScout's API.

## Build A Local MCPB

```bash
npm install
npm run mcpb:validate
npm run mcpb:pack
```

The packaged bundle is written to:

```bash
release/smartscout-adapter-v1.1.0.mcpb
```

## Install Via Manual MCP

### Install From GitHub Source

```bash
git clone https://github.com/BWB03/smartscout-adapter.git
cd smartscout-adapter
npm install
npm run build
```

This produces the MCP server entrypoint at:

```bash
./dist/index.js
```

### MCP Server Command

The adapter runs as a stdio MCP server:

```bash
node /absolute/path/to/smartscout-adapter/dist/index.js
```

### Required Environment

The MCP server requires:

```bash
SMARTSCOUT_API_KEY=your_api_key_here
```

## Claude Desktop MCP Config

If you prefer manual JSON config instead of the `.mcpb` installer, add this server to Claude Desktop's MCP settings:

```json
{
  "mcpServers": {
    "smartscout": {
      "command": "node",
      "args": ["/absolute/path/to/smartscout-adapter/dist/index.js"],
      "env": {
        "SMARTSCOUT_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Restart Claude Desktop after saving the config.

## Claude Code / Codex Setup

Claude Code, Codex, and other stdio MCP clients can use the same local server command after building from source:

```json
{
  "mcpServers": {
    "smartscout": {
      "command": "node",
      "args": ["/absolute/path/to/smartscout-adapter/dist/index.js"],
      "env": {
        "SMARTSCOUT_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

For Codex CLI-style configs, use the equivalent command/args/env shape supported by your client:

```toml
[mcp_servers.smartscout]
command = "node"
args = ["/absolute/path/to/smartscout-adapter/dist/index.js"]

[mcp_servers.smartscout.env]
SMARTSCOUT_API_KEY = "your_api_key_here"
```

### Generic MCP Client Config

Any MCP client that supports stdio servers can use the same command:

```json
{
  "smartscout": {
    "command": "node",
    "args": ["/absolute/path/to/smartscout-adapter/dist/index.js"],
    "env": {
      "SMARTSCOUT_API_KEY": "your_api_key_here"
    }
  }
}
```

### Update Flow

When you pull a new version from GitHub:

```bash
git pull
npm install
npm run build
```

For MCPB releases, download and install the newer `.mcpb` file from GitHub Releases.

## Environment

| Variable | Required | Default | Description |
|---|---|---:|---|
| `SMARTSCOUT_API_KEY` | Yes | — | SmartScout API key |
| `SMARTSCOUT_RATE_LIMIT_RPS` | No | `2` | Requests per second |
| `SMARTSCOUT_RATE_LIMIT_BURST` | No | `10` | Burst limit |
| `SMARTSCOUT_TIMEOUT_MS` | No | `30000` | Request timeout in milliseconds |
| `SMARTSCOUT_PRODUCT_HISTORY_TIMEOUT_MS` | No | `90000` | Timeout override for `smartscout_get_product_history` |

## Request Pattern

Search-style tools accept:

- `marketplace`
- `page_id`
- `page_size`
- `sort_by`
- `sort_order`
- `filters`

`filters` must use official SmartScout top-level field names. Invalid filter keys are rejected client-side with a `smartscout_validation` error instead of being silently passed through.

Example:

```json
{
  "filters": {
    "brandName": {
      "type": "contains",
      "filter": "Nike"
    },
    "monthlyRevenue": {
      "min": 50000
    }
  },
  "marketplace": "US",
  "page_size": 25
}
```

Common gotchas now caught client-side:

- For one exact ASIN, prefer `asin`
- If you use `asins`, send `asins: { "filter": ["ASIN"] }` or a bare array the adapter can coerce
- Do not use `asinList`
- Use `amazonSellerId` or `amazonSellerIds`, not `sellerId`
- Use `searchTermValue`, not `searchTerm`
- For subcategory-brand sorting, use `revenue`, not `monthlyRevenue`

## Known-Good Fields

Examples of known-good filter keys by tool:

- `smartscout_search_products`: `asin`, `asins`, `brandName`, `categoryName`, `subcategoryName`, `subcategoryId`, `rank`, `monthlyRevenueEstimate`, `reviewCount`, `reviewRating`, `buyBoxPrice`, `productPageScore`, `numberOfSellers`, `numberFbaSellers`, `outOfStockNow`, `isVariation`, `parentAsin`, `title`, `upc`, `listedSince`
  For a single exact product lookup, `asin` is the simplest and most reliable form.
- `smartscout_search_sellers`: `amazonSellerId`, `amazonSellerIds`, `sellerName`, `sellerNames`, `businessName`, `businessNames`, `categoryName`, `subcategoryName`, `estimateSales`, `percentFba`, `numberWinningBrands`, `numberAsins`, `numberTopAsins`, `numberReviewsLifetime`, `numberReviews30Days`, `city`, `state`, `country`, `zipCode`, `isSuspended`
- `smartscout_search_terms`: `searchTermValue`, `estimateSearches`, `estimatedCpc`, `brands`, `products`, `superCharge`

Examples of known-good `sort_by` values:

- `smartscout_get_subcategory_brands`: `revenue`, `marketshare`, `avgPrice`, `avgVolume`, `totalReviews`, `totalNumberUnitsSold`, `numberASINs`, `reviewRating`, `adSpendShare`
- `smartscout_get_product_history`: `date`, `salesRank`, `buyBoxPrice`, `newFbaPrice`, `newFbmPrice`, `reviewsCount`, `newOfferCount`

## Output Pattern

Every response uses the same normalized envelope:

```json
{
  "source": "smartscout",
  "adapter_version": "1.0.0",
  "data_type": "brand_summary",
  "marketplace": "US",
  "retrieved_at": "2026-04-22T23:00:00.000Z",
  "pagination": {
    "next_page_id": null,
    "has_more_records": false,
    "data_count": 25,
    "page_size": 25
  },
  "data": []
}
```

## Development

```bash
npm test
npm run build
npm run mcpb:validate
npm run mcpb:pack
SMARTSCOUT_API_KEY=xxx npm run test:integration
```

## MCPB Release Flow

Version tags create GitHub Releases with the packaged `.mcpb` attached:

```bash
git tag v1.1.0
git push origin v1.1.0
```

The release workflow runs tests, builds the adapter, validates the MCPB manifest, packs the bundle, and uploads `release/*.mcpb` as a release asset.

## MCPB Test Checklist

- Run `npm test`.
- Run `npm run build`.
- Run `npm run mcpb:validate`.
- Run `npm run mcpb:pack`.
- Confirm `release/smartscout-adapter-v1.1.0.mcpb` exists.
- Open the `.mcpb` file with Claude Desktop.
- Enter `SMARTSCOUT_API_KEY` in the install form.
- Confirm SmartScout tools appear in Claude Desktop.
- Run a low-cost brand or product search.
- Temporarily install with a missing or invalid key and confirm the adapter returns a clear SmartScout/API-key error rather than crashing.
- Push a version tag and confirm the GitHub Action attaches the `.mcpb` to the release.

## Troubleshooting

- **Claude Desktop does not show the tools:** restart Claude Desktop, confirm the extension is enabled, and reinstall the `.mcpb` if needed.
- **Missing API key errors:** reinstall or edit the extension configuration and enter a valid SmartScout API key.
- **Invalid SmartScout key or unauthorized responses:** verify the key works against SmartScout directly and has access to the API endpoints you are calling.
- **Node/runtime errors:** use the `.mcpb` install path when possible. For manual installs, confirm `node --version` is `18` or newer.
- **Build output looks stale:** run `npm run build`, then `npm run mcpb:pack` again.
- **Network/API failures:** confirm the machine running Claude Desktop can reach `https://api.smartscout.com`.
- **Manual JSON config does not work:** use an absolute path to `dist/index.js`, keep `command` as `node`, and restart the MCP client after editing config.

## Live Validation

This adapter has been live-tested against SmartScout with:

- brand search
- search term search
- product search
- product history for `B01MCWCHR8`
- validation rejection for bad filter keys and bad sort keys

The live integration test is in `tests/integration/live-api.test.ts`.

## Notes

- SmartScout pagination is cursor-based, so the adapter returns `next_page_id` instead of page numbers.
- Page size is capped at `1000`.
- Default rate limiting matches the SmartScout guidance you shared: `2 requests/second`, burst `10`.
- `smartscout_get_product_history` now uses a longer timeout, but SmartScout appears to return full history even when `page_size` is provided. Treat it as a full-history fetch until their API proves otherwise.
- The next step after validating this repo with your key is wiring SmartScout into Helm as a BYO source.
