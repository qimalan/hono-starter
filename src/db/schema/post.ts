import { timestamps } from "@/db/utils/columns";
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["published", "draft"]);
export const postTable = pgTable("posts", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: text().notNull(),
	content: text(),
	status: statusEnum().default("draft"),
	tags: text().array(),
	...timestamps,
});
