import { z } from "@hono/zod-openapi";

export const PaginationSchema = z.object({
	page: z.coerce.number().int().default(1),
	pageSize: z.coerce.number().int().default(20),
});
