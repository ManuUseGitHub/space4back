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
			out: { type: "stdout" },
			file: {
				type: "file",
				filename: logFile,
				maxLogSize: 1048576,
				backups: 3,
				compress: false,
			},
		},
		categories: {
			default: {
				appenders: ["console", "out", "file"],
				level: "info",
			},
		},
		// 🔴 IMPORTANT FOR CPANEL
		disableClustering: true,
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
