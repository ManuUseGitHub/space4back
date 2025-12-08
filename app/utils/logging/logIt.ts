import {jsonStringifyRecursive} from "~~/server/utils/common/objects"
export default async (
	message: any,
	level: "console" | "info" | "warning" | "error" | "fatal"
) => {
	await $fetch("/api/log", {
		method: "POST",
		body: {
			level,
			message:
				typeof message != "string" ? jsonStringifyRecursive(message) : message,
		},
	});
};
