import { success } from "@/common/helpers/success";
import { db } from "@/db";
import { postTable } from "@/db/schema";
import { postFilters, postSortableColumns } from "./config";

import { bizError } from "@/common/helpers/bizError";
import { paginate } from "@/common/helpers/paginate";
import { BIZ_CODE } from "@/constants/code";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { count, eq } from "drizzle-orm";
import {
	createPost,
	deletePost,
	detailPost,
	listPost,
	updatePost,
} from "./routes";

export const addPostRoutes = (app: OpenAPIHono) => {
	app
		.openapi(listPost, async (c) => {
			const { page, pageSize, sort, ...filters } = c.req.valid("query");
			//可以做一些联表什么的
			const countQb = db.select({ count: count() }).from(postTable).$dynamic();
			const queryQb = db.select().from(postTable).$dynamic();
			const result = await paginate(countQb, queryQb, {
				page,
				pageSize,
				sortParams: sort,
				sortableColumns: postSortableColumns,
				filters,
				filterConfig: postFilters,
			});
			// throw new HTTPException(403,{message:"123124"})
			// return bizError(c,BIZ_CODE.USER_NOT_FOUND,"bucunzai")
			return success(c, result);
		})
		.openapi(detailPost, async (c) => {
			const { id } = c.req.valid("param");
			const postItem = await db.query.postTable.findFirst({
				where: eq(postTable.id, id),
			});
			if (!postItem) return bizError(c, BIZ_CODE.USER_NOT_FOUND, "文章不存在");
			return success(c, postItem);
		})
		.openapi(createPost, async (c) => {
			const body = c.req.valid("json");
			const [insertedPostItem] = await db
				.insert(postTable)
				.values(body)
				.returning();
			return success(c, insertedPostItem);
		})
		.openapi(deletePost, async (c) => {
			const { id } = c.req.valid("param");
			const [deletedPostItem] = await db
				.delete(postTable)
				.where(eq(postTable.id, id))
				.returning();
			return success(c, deletedPostItem);
		})
		.openapi(updatePost, async (c) => {
			const { id } = c.req.valid("param");
			const body = c.req.valid("json");
			const [updatedPostItem] = await db
				.update(postTable)
				.set(body)
				.where(eq(postTable.id, id))
				.returning();
			return success(c, updatedPostItem);
		});

	return app;
};
