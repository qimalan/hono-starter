import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
	updatedAt: timestamp({ mode: "string", withTimezone: true })
		.defaultNow()
		.$onUpdate(() => sql`now()`),
	createdAt: timestamp({ mode: "string", withTimezone: true }).defaultNow(),
	deletedAt: timestamp({ mode: "string", withTimezone: true }).default(
		sql`NULL`,
	),
};
