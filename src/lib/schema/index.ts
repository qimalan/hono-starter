import { z } from "@hono/zod-openapi";
import { createSchemaFactory } from "drizzle-zod";

const PaginationSchema = z.object({
	page: z.coerce.number().int().positive().default(1),
	pageSize: z.coerce.number().int().positive().default(20),
});

const PaginateResponseSchema = z.object({
	meta: z.object({
		totalItems: z.number(),
		totalPages: z.number(),
		currentPage: z.number(),
		pageSize: z.number(),
	}),
	items: z.unknown(),
});

const IdParamsSchema = z.object({
	id: z.coerce
		.number()
		.int()
		.positive()
		.openapi({
			param: {
				name: "id",
				in: "path",
			},
			example: 1,
		}),
});

const { createInsertSchema, createSelectSchema, createUpdateSchema } =
	createSchemaFactory({
		zodInstance: z,
	});

export {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
	PaginationSchema,
	IdParamsSchema,
	PaginateResponseSchema,
};
