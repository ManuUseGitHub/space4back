import { AppDataSource } from "~~/server/DB/data-source.js";
import { getUserProfiles } from "~~/server/utils/dsource";

export default defineEventHandler(async (event) => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}
	const users = await getUserProfiles(event);

	return users;
});
