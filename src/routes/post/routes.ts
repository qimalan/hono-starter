import { createOpenApiResponse } from "@/lib/openapi/create-openapi-response";
import { createRoute, z } from "@hono/zod-openapi";
import {
	PostListSchema,
	PostInsertSchema,
	PostSelectSchema,
	PostUpdateSchema,
} from "./schema";
import { IdParamsSchema, PaginateResponseSchema } from "@/lib/schema";
import { jsonContentRequired } from "@/lib/openapi/json-content-required";

const tags = ["文章操作"];

export const list = createRoute({
	method: "get",
	path: "/post",
	request: {
		query: PostListSchema,
	},
	responses: {
		...createOpenApiResponse(
			"文章分页查询",
			PaginateResponseSchema.extend({
				items: z.array(PostSelectSchema),
			}),
		),
	},
	tags,
});

export const getOne = createRoute({
	method: "get",
	path: "/post/{id}",
	request: {
		params: IdParamsSchema,
	},
	responses: {
		...createOpenApiResponse("文章详情查询", PostSelectSchema),
	},
	tags,
});

export const create = createRoute({
	method: "post",
	path: "/post",
	request: {
		body: jsonContentRequired(PostInsertSchema),
	},
	responses: {
		...createOpenApiResponse("创建文章", PostSelectSchema),
	},
	tags,
});

export const remove = createRoute({
	method: "delete",
	path: "/post/{id}",
	request: {
		params: IdParamsSchema,
	},
	responses: {
		...createOpenApiResponse("删除文章", PostSelectSchema),
	},
	tags,
});

export const update = createRoute({
	method: "patch",
	path: "/post/{id}",
	request: {
		params: IdParamsSchema,
		body: jsonContentRequired(PostUpdateSchema),
	},
	responses: {
		...createOpenApiResponse("更新文章", PostSelectSchema),
	},
	tags,
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
