import type { PgColumn, PgSelect } from "drizzle-orm/pg-core";
import { type SortParam, applySorting } from "./applyQuerySorting";
import { type FilterConfig, buildFilter } from "./buildQueryFilter";

interface PaginateOptions<
	S extends Record<string, PgColumn>,
	F extends Record<string, unknown>,
> {
	page: number;
	pageSize: number;
	sortParams: SortParam<S>[];
	sortableColumns: S;
	filters?: F;
	filterConfig?: FilterConfig<F>;
}

export async function paginate<
	C extends PgSelect,
	Q extends PgSelect,
	S extends Record<string, PgColumn>,
	F extends Record<string, unknown>,
>(countQb: C, queryQb: Q, options: PaginateOptions<S, F>) {
	const { page, pageSize, sortParams, sortableColumns, filters, filterConfig } =
		options;
	const offset = (page - 1) * pageSize;

	const whereClause = buildFilter(filters, filterConfig);

	if (whereClause) {
		countQb = countQb.where(whereClause);
		queryQb = queryQb.where(whereClause);
	}

	queryQb = applySorting(queryQb, sortParams, sortableColumns);

	const [count, items] = await Promise.all([
		countQb,
		queryQb.limit(pageSize).offset(offset),
	]);

	const totalItems = count.length > 0 ? count[0]?.count : 0;

	const totalPages = Math.ceil(totalItems / pageSize);

	return {
		meta: {
			totalItems,
			totalPages,
			currentPage: page,
			pageSize,
		},
		items,
	};
}
