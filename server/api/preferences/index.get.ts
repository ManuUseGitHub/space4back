import { Preferences } from "~~/server/DB/entity/Preferences.js";
import { AppDataSource } from "~~/server/DB/data-source.js";

export default defineEventHandler(async (event) => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const userRepo = AppDataSource.getRepository(Preferences);
	return await userRepo.find();
});
