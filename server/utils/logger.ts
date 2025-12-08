// server/utils/logger.js
import log4js from "log4js";

export const getLogFile = (env: string) => {
	return (
		{
			development: "logs/app.log",
			production: "logs/app.prod.log",
			test: "logs/app.test.log",
		}[env] || "logs/app.log"
	);
};

export const createLogger = (logFile: string) => {
	log4js.configure({
		appenders: {
			console: { type: "console" },
			file: {
				type: "file",
				filename: logFile,
				maxLogSize: 1048576,
				backups: 3,
			},
		},
		categories: {
			default: { appenders: ["console", "file"], level: "info" },
		},
	});

	return log4js.getLogger();
};

export const logIt = (
	message: any,
	level: "console" | "info" | "warning" | "error" | "fatal" = "info",
	env: string | undefined = undefined
) => {
	let stringMessage =
		typeof message != "string" ? jsonStringifyRecursive(message) : message;
	stringMessage = stringMessage != "" ? stringMessage : "__VOID__LOG__";
	if (env) {
		(createLogger(getLogFile(env)) as any)[level](stringMessage);
	} else {
		const env: string = process.env.APP_ENV || "development";

		(createLogger(getLogFile(env)) as any)[level](stringMessage);
	}
};
