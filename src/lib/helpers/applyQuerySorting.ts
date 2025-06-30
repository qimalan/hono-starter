import { asc, desc } from "drizzle-orm";
import type { PgColumn, PgSelect } from "drizzle-orm/pg-core";

export interface SortParam<T> {
	key: keyof T;
	order: "asc" | "desc";
}

export function applySorting<
	Q extends PgSelect,
	C extends Record<string, PgColumn>,
>(qb: Q, sortParams: SortParam<C>[], config: C) {
	const orderByClauses = sortParams.map((param) => {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const column = config[param.key]!;
		return param.order === "asc" ? asc(column) : desc(column);
	});

	return qb.orderBy(...orderByClauses);
}
