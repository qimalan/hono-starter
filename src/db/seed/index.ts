import { db } from "@/db";
import * as schema from "@/db/schema";
import { reset, seed } from "drizzle-seed";

async function main() {
	await reset(db, schema);
	await seed(db, { postTable: schema.postTable }).refine((f) => ({
		postTable: {
			columns: {
				tags: f.valuesFromArray({
					values: ["tech", "lifestyle", "coding", "drizzle", "orm"],
					arraySize: 4,
				}),
				updatedAt: f.default({
					defaultValue: null,
				}),
				deletedAt: f.default({
					defaultValue: null,
				}),
			},
		},
	}));
	console.log("seeding done!");
}
main();
