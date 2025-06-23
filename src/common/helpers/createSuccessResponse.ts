import { BIZ_CODE } from "@/constants/code";
import { z } from "@hono/zod-openapi";
import type { StatusCode } from "hono/utils/http-status";

export const createResponse = <T extends z.ZodSchema, S extends StatusCode>(
	description: string,
	schema: T,
	status: S,
) => {
	return {
		[status]: {
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
	} as const;
};

export const createSuccessResponse = <T extends z.ZodSchema>(
	description: string,
	schema: T,
) => {
	return createResponse(description ?? "请求成功", schema, 200);
};
