import { OpenAPIHono, z } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { DrizzleQueryError } from "drizzle-orm/errors";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { addPostRoutes } from "./routes/post";

const app = new OpenAPIHono({
	defaultHook: (result, c) => {
		if (!result.success) {
			return c.json(
				{
					code: 422,
					message: "参数验证失败",
					data: {
						errors: z.flattenError(result.error).fieldErrors,
					},
				},
				422,
			);
		}
	},
});

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

addPostRoutes(app);

// 生成 OpenAPI 文档
app.doc("/ui", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "我的 RESTful API",
	},
});

// 提供 Scalar UI
app.get("/doc", Scalar({ url: "/ui", pageTitle: "Awesome API" }));
export default app;
