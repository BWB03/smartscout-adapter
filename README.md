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

## Install Via MCP

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

## Environment

| Variable | Required | Default | Description |
|---|---|---:|---|
| `SMARTSCOUT_API_KEY` | Yes | — | SmartScout API key |
| `SMARTSCOUT_RATE_LIMIT_RPS` | No | `2` | Requests per second |
| `SMARTSCOUT_RATE_LIMIT_BURST` | No | `10` | Burst limit |
| `SMARTSCOUT_TIMEOUT_MS` | No | `30000` | Request timeout in milliseconds |

## Request Pattern

Search-style tools accept:

- `marketplace`
- `page_id`
- `page_size`
- `sort_by`
- `sort_order`
- `filters`

`filters` is passed directly through to SmartScout’s request DSL, which keeps the adapter flexible and avoids freezing a partial hand-written schema.

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
SMARTSCOUT_API_KEY=xxx npm run test:integration
```

## Live Validation

This adapter has been live-tested against SmartScout with:

- brand search
- search term search
- product search

The live integration test is in `tests/integration/live-api.test.ts`.

## Notes

- SmartScout pagination is cursor-based, so the adapter returns `next_page_id` instead of page numbers.
- Page size is capped at `1000`.
- Default rate limiting matches the SmartScout guidance you shared: `2 requests/second`, burst `10`.
- The next step after validating this repo with your key is wiring SmartScout into Helm as a BYO source.
