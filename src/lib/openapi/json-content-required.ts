import type { z } from "@hono/zod-openapi";

export const jsonContentRequired = <T extends z.ZodSchema>(schema: T) => {
	return {
		content: {
			"application/json": {
				schema,
			},
		},
		required: true,
	};
};
