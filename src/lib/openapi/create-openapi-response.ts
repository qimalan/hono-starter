import { BIZ_CODE } from "@/lib/constants";
import { z } from "@hono/zod-openapi";

export const createOpenApiResponse = <T extends z.ZodSchema>(
	description: string,
	schema: T,
) => {
	return {
		200: {
			//业务错误也是返回200。其他验证错误，数据库错误，内部错误已全局处理
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
