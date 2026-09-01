import { AppDataSource } from "~~/server/DB/data-source.js";
import { getUserProfileInfos } from "~~/server/DB/dataAccess/users/user";

export default defineEventHandler(async (event) => {
	const id = event.context.params?.userid;
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}
	
	return getUserProfileInfos(event,id);
});
