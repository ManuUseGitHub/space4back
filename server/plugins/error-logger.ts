import { H3Error } from "h3";

export default defineNitroPlugin((nitroApp) => {
	nitroApp.hooks.hook("error", async (error, { event }) => {
		const h3Error = error as H3Error;

		const log: { message: any; level: "info" | "error" | "fatal" | "warning" } =
			{
				level:
					h3Error.statusCode && h3Error.statusCode >= 500 ? "fatal" : "error",
				message: {
					name: h3Error.name,
					statusCode: h3Error.statusCode,
					statusMessage: h3Error.statusMessage,
					message: h3Error.message,
					stack: h3Error.stack,
					url: event?.path,
					method: event?.method,
					event,
				},
			};

		logIt(log.message, log.level);
	});
});
