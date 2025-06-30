import { db } from "@/db";
import type {
	CreateRoute,
	GetOneRoute,
	ListRoute,
	UpdateRoute,
	RemoveRoute,
} from "./routes";
import type { AppRouteHandler } from "@/lib/types";
import { count, eq } from "drizzle-orm";
import { postTable } from "@/db/schema";
import { paginate } from "@/lib/helpers/paginate";
import { success } from "@/lib/helpers/success";
import { bizError } from "@/lib/helpers/bizError";
import { postFilters, postSortableColumns } from "./config";
import { BIZ_CODE } from "@/lib/constants";

export const list: AppRouteHandler<ListRoute> = async (c) => {
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
	return success(c, result);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
	const { id } = c.req.valid("param");
	const postItem = await db.query.postTable.findFirst({
		where: eq(postTable.id, id),
	});
	if (!postItem) return bizError(c, BIZ_CODE.USER_NOT_FOUND, "文章不存在");
	return success(c, postItem);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
	const body = c.req.valid("json");
	const [insertedPostItem] = await db
		.insert(postTable)
		.values(body)
		.returning();
	return success(c, insertedPostItem);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
	const { id } = c.req.valid("param");
	const [deletedPostItem] = await db
		.delete(postTable)
		.where(eq(postTable.id, id))
		.returning();
	return success(c, deletedPostItem);
};

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
	const { id } = c.req.valid("param");
	const body = c.req.valid("json");
	const [updatedPostItem] = await db
		.update(postTable)
		.set(body)
		.where(eq(postTable.id, id))
		.returning();
	return success(c, updatedPostItem);
};
