import type { z } from "@hono/zod-openapi";

export const createRequestBodySchema = <T extends z.ZodSchema>(schema: T) => {
	return {
		content: {
			"application/json": {
				schema,
			},
		},
	};
};
