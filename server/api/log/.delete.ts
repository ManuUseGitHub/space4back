import { getLogFile, logIt } from "~~/server/utils/logger";
import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
	const logPath = path.resolve(
		getLogFile(process.env.APP_ENV || "development")
	);
	fs.truncate(logPath, 0, function () {});
	return { success: true };
});
