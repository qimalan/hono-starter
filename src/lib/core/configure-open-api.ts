import { Scalar } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "../types";

import packageJSON from "../../../package.json" with { type: "json" };

export default function configureOpenAPI(app: AppOpenAPI) {
	app.doc("/ui", {
		openapi: "3.0.0",
		info: {
			version: packageJSON.version,
			title: "Hono API",
		},
	});

	app.get(
		"/doc",
		Scalar({
			url: "/ui",
			theme: "kepler",
			defaultHttpClient: {
				targetKey: "js",
				clientKey: "fetch",
			},
		}),
	);
}
