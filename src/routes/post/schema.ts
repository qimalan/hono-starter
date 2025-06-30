import { postTable, statusEnum } from "@/db/schema";
import { z } from "@hono/zod-openapi";
import { postSortableKeys } from "./config";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
	PaginationSchema,
} from "@/lib/schema";

const PostFilterSchema = z.object({
	status: z.enum(statusEnum.enumValues).optional(),
	tags: z.preprocess((val) => {
		if (typeof val !== "string" || !val.trim()) {
			return undefined;
		}

		const tagsArray = val
			.split(",")
			.map((tag) => {
				let cleanTag = tag.trim();
				if (
					(cleanTag.startsWith('"') && cleanTag.endsWith('"')) ||
					(cleanTag.startsWith("'") && cleanTag.endsWith("'"))
				) {
					cleanTag = cleanTag.substring(1, cleanTag.length - 1);
				}

				return cleanTag.trim();
			})
			.filter(Boolean);

		return tagsArray.length > 0 ? tagsArray : undefined;
	}, z.array(z.string()).optional()),
});

export type PostFilter = z.infer<typeof PostFilterSchema>;

export const listSchema = z.object({
	...PaginationSchema.shape,
	...PostFilterSchema.shape,
	sort: z.preprocess(
		(val) => {
			const str =
				typeof val === "string" && val.trim() ? val : "createdAt:desc";
			return str.split(",").map((part) => {
				const [key, order] = part.split(":");
				return {
					key,
					order,
				};
			});
		},
		z.array(
			z.object({
				key: z.enum(postSortableKeys),
				order: z.enum(["asc", "desc"]),
			}),
		),
	),
});

export const PostParamSchema = z.object({
	id: z.coerce
		.number()
		.int()
		.positive()
		.openapi({
			param: {
				name: "id",
				in: "path",
			},
			description: "The unique identifier of the post.",
			example: 1,
		}),
});

export const PostSelectSchema = createSelectSchema(postTable);
export const PostInsertSchema = createInsertSchema(postTable).omit({
	updatedAt: true,
	deletedAt: true,
	createdAt: true,
});
export const PostUpdateSchema = createUpdateSchema(postTable).omit({
	updatedAt: true,
	deletedAt: true,
	createdAt: true,
});
