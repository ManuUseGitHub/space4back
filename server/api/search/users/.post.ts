import { AppDataSource } from "~~/server/DB/data-source.js";

export default defineEventHandler(async (event) => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const result = await initializeDataSource(event);
	if (result) {
		return await searchUsers(result);
	}
});
