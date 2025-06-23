import { createRequestBodySchema } from "@/common/helpers/createRequestBodySchema";
import { createSuccessResponse } from "@/common/helpers/createSuccessResponse";
import { PaginateResponseSchema } from "@/common/schema/PaginateResponseSchema";
import { createRoute, z } from "@hono/zod-openapi";
import {
	PostInsertSchema,
	PostParamSchema,
	PostSelectSchema,
	PostUpdateSchema,
	QueryPostListSchema,
} from "./schema";

const PostPaginateResponseSchema = PaginateResponseSchema.extend({
	items: z.array(PostSelectSchema),
});

const tags = ["文章操作"];

const listPost = createRoute({
	method: "get",
	path: "/post",
	request: {
		query: QueryPostListSchema,
	},
	responses: {
		...createSuccessResponse("文章分页查询", PostPaginateResponseSchema),
	},
	tags,
});

const detailPost = createRoute({
	method: "get",
	path: "/post/{id}",
	request: {
		params: PostParamSchema,
	},
	responses: {
		...createSuccessResponse("文章详情查询", PostSelectSchema),
	},
	tags,
});

const createPost = createRoute({
	method: "post",
	path: "/post",
	request: {
		body: createRequestBodySchema(PostInsertSchema),
	},
	responses: {
		...createSuccessResponse("创建文章", PostSelectSchema),
	},
	tags,
});

const deletePost = createRoute({
	method: "delete",
	path: "/post/{id}",
	request: {
		params: PostParamSchema,
	},
	responses: {
		...createSuccessResponse("删除文章", PostSelectSchema),
	},
	tags,
});

const updatePost = createRoute({
	method: "patch",
	path: "/post/{id}",
	request: {
		params: PostParamSchema,
		body: createRequestBodySchema(PostUpdateSchema),
	},
	responses: {
		...createSuccessResponse("更新文章", PostSelectSchema),
	},
	tags,
});

export { listPost, deletePost, detailPost, createPost, updatePost };
