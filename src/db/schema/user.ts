import { timestamps } from "@/db/utils/columns";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	age: integer(),
	// email: varchar({ length: 255 }).notNull().unique(),
	...timestamps,
});
