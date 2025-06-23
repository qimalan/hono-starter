import { z } from "@hono/zod-openapi";

export const PaginateResponseSchema = z.object({
	meta: z.object({
		totalItems: z.number(),
		totalPages: z.number(),
		currentPage: z.number(),
		pageSize: z.number(),
	}),
	items: z.unknown(),
});
