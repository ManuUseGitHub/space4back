import { logIt } from "../../utils/logger";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { level = "info", message = "" } = body;

	console.log(body);
	logIt(message, level);

	return { success: true, logged: message };
});
