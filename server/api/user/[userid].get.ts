import { AppDataSource } from "~~/server/DB/data-source.js";
import { getUserProfileInfos } from "~~/server/utils/dsource";

export default defineEventHandler(async (event) => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}
	
	return getUserProfileInfos(event);
});
