import { createRouter } from "@/lib/core/create-app";

import * as handlers from "./handlers";
import * as routes from "./routes";

export const post = createRouter()
	.openapi(routes.list, handlers.list)
	.openapi(routes.create, handlers.create)
	.openapi(routes.getOne, handlers.getOne)
	.openapi(routes.update, handlers.update)
	.openapi(routes.remove, handlers.remove);
