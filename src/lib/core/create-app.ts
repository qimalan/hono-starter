import { OpenAPIHono, z } from "@hono/zod-openapi";
import type { AppBindings } from "../types";
import { csrf } from "hono/csrf";
import { cors } from "hono/cors";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { HTTPException } from "hono/http-exception";
import { DrizzleQueryError } from "drizzle-orm/errors";

export function createRouter() {
	return new OpenAPIHono<AppBindings>({
		strict: false,
		defaultHook(result, c) {
			if (!result.success) {
				return c.json(
					{
						code: 400,
						message: "参数验证失败",
						error: z.prettifyError(result.error),
					},
					400,
				);
			}
		},
	});
}

export function createApp() {
	const app = createRouter();
	app
		.use(csrf())
		.use(cors())
		.onError((err, c) => {
			let statusCode: ContentfulStatusCode = 500;
			let message = "Internal Server Error";
			if (err instanceof HTTPException) {
				statusCode = err.status;
				message = err.message;
			}

			if (err instanceof DrizzleQueryError) {
				message = err.message;
			}

			return c.json(
				{
					code: statusCode,
					message,
					data: null,
				},
				statusCode,
			);
		})
		.notFound((c) =>
			c.json({ message: "Not Found", code: 404, data: null }, 404),
		);

	return app;
}
