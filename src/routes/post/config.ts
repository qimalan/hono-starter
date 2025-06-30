import type { FilterConfig } from "@/lib/helpers/buildQueryFilter";
import { postTable } from "@/db/schema";
import { arrayContains, eq } from "drizzle-orm";
import type { PgColumn } from "drizzle-orm/pg-core";
import type { PostFilter } from "./schema";

//定义支持排序和过滤的选项

export const postSortableColumns: Record<string, PgColumn> = {
	createdAt: postTable.createdAt,
	id: postTable.id,
};

export const postSortableKeys = Object.keys(postSortableColumns);

export const postFilters: FilterConfig<PostFilter> = {
	status: (value) => eq(postTable.status, value),
	tags: (value) => arrayContains(postTable.tags, value),
};
