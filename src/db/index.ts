import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
export const db = drizzle({
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	connection: Bun.env.DATABASE_URL!,
	schema,
	casing: "snake_case",
});
