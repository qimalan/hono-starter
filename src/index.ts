import configureOpenAPI from "./lib/core/configure-open-api";
import { createApp } from "./lib/core/create-app";

const app = createApp();
configureOpenAPI(app);

export default app;
