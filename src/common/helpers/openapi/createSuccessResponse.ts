import { BIZ_CODE } from "@/constants/code";
import { z } from "@hono/zod-openapi";

export const createSuccessResponse = <T extends z.ZodSchema>(
	description: string,
	schema: T,
) => {
	return {
		200: {
			description,
			content: {
				"application/json": {
					schema: z.object({
						code: z.enum(BIZ_CODE),
						message: z.string(),
						data: schema.nullish(),
					}),
				},
			},
		},
	};
};
