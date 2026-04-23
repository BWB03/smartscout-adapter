import { z } from "zod";
import { PaginationSchema } from "../schema/universal.js";

export type Pagination = z.infer<typeof PaginationSchema>;

export function extractPagination(raw: {
  dataCount?: number | null;
  paging?: {
    nextPageId?: string | null;
    hasMoreRecords?: boolean;
  } | null;
}, pageSize?: number): Pagination | undefined {
  if (!raw.paging) return undefined;

  return {
    next_page_id: raw.paging.nextPageId ?? null,
    has_more_records: raw.paging.hasMoreRecords ?? false,
    data_count: raw.dataCount ?? null,
    page_size: pageSize ?? null,
  };
}
