import { type SQL, and } from "drizzle-orm";

export type FilterConfig<T> = {
	[K in keyof T]?: (value: NonNullable<T[K]>) => SQL;
};

export function buildFilter<C extends Record<string, unknown>>(
	filters?: C,
	config?: FilterConfig<C>,
): SQL | undefined {
	if (!filters || !config) {
		return undefined;
	}

	const conditions: SQL[] = [];
	for (const key of Object.keys(config)) {
		const value = filters[key];
		const handler = config[key];
		if (value && handler) {
			const condition = handler(value as NonNullable<C[typeof key]>);
			conditions.push(condition);
		}
	}

	return conditions.length > 0 ? and(...conditions) : undefined;
}
