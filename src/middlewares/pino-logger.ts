import { pino } from "pino";
import { pinoLogger as logger } from "hono-pino";

const isProduction = Bun.env.NODE_ENV === "production";

const pinoInstance = pino({
	level: Bun.env.LOG_LEVEL ?? "info",
	redact: {
		paths: ["req.headers.authorization", "req.headers.cookie", "password"],
		censor: "[REDACTED]",
	},
	// In production, we want structured JSON logs for performance and machine readability.
	// In development, we use pino-pretty for human-readable logs.
	transport: isProduction
		? undefined
		: {
				target: "pino-pretty",
				options: {
					colorize: true, // Add color to the output
					crlf: false, // Don't use carriage return, just newline
					translateTime: "SYS:yyyy-mm-dd HH:MM:ss", // Prettier timestamp
					ignore: "pid,hostname", // Don't log pid and hostname
				},
			},
});

export function pinoLogger() {
	return logger({
		pino: pinoInstance,
	});
}
