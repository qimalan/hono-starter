import configureOpenAPI from "./lib/core/configure-open-api";
import { createApp } from "./lib/core/create-app";
import { post } from "./routes/post";

const app = createApp();
configureOpenAPI(app);

const routes = [post] as const;

for (const route of routes) {
	app.route("/", route);
}

export default {
	port: Bun.env.PORT ?? 3000,
	fetch: app.fetch,
};
