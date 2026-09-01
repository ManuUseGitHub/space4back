import { AppDataSource } from "~~/server/DB/data-source.js";
import { getUserProfiles } from "~~/server/utils/dsource";
import { withDbHandler } from "~~/server/utils/withDbHandler";

export default defineEventHandler(
	withDbHandler(async (event) => {
		if (!AppDataSource.isInitialized) {
			await AppDataSource.initialize();
		}

		return {
			success: true,
			users: await getUserProfiles(event),
		};
	})
);
