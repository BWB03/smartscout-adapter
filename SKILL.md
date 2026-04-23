---
name: smartscout-adapter
description: >
  Universal adapter for SmartScout Amazon market intelligence. Pulls
  brands, products, sellers, subcategories, search terms, and relevancy
  data into a standardized schema any agent can consume.
version: 1.0.0
author: Voartex
category: amazon-tools
---

# SmartScout Adapter

SkillCrate adapter that wraps the SmartScout API and normalizes responses into a universal agent-readable JSON schema.

## Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `SMARTSCOUT_API_KEY` | Yes | Your SmartScout API key |
| `SMARTSCOUT_RATE_LIMIT_RPS` | No | Requests per second (default: 2) |
| `SMARTSCOUT_RATE_LIMIT_BURST` | No | Burst limit (default: 10) |
| `SMARTSCOUT_TIMEOUT_MS` | No | Request timeout in ms (default: 30000) |

## Capabilities

- Brand search and brand-level market share
- Product discovery and ASIN history
- Seller search and seller brand coverage
- Subcategory discovery and subcategory brand coverage
- Search term discovery
- Relevant products and relevant search terms for an ASIN
- Sales estimate lookup

## Usage

### As MCP Server
```bash
SMARTSCOUT_API_KEY=xxx npx smartscout-adapter
```

### As Library Wrapper
```typescript
import { SmartScoutSkill } from "smartscout-adapter";

const skill = new SmartScoutSkill(apiKey);
const brands = await skill.searchBrands({
  brandName: { type: "contains", filter: "Nike" }
});
```
