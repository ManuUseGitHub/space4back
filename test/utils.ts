import { $fetch } from "@nuxt/test-utils/e2e";
export const logIt = (
	message: any,
	level: "info" | "warning" | "error" | "fatal"
) => {
	$fetch("/api/log/", {
		method: "post",
		body: {
			message:
				typeof message != "string" ? jsonStringifyRecursive(message) : message,
			level,
		},
	});
};
