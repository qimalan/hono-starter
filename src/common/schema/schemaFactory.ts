import { z } from "@hono/zod-openapi";
import { createSchemaFactory } from "drizzle-zod";

const { createInsertSchema, createSelectSchema, createUpdateSchema } =
	createSchemaFactory({
		zodInstance: z,
	});

export { createInsertSchema, createSelectSchema, createUpdateSchema };
