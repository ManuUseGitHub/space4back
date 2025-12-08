import { AppDataSource } from "~~/server/DB/data-source.js";
import { Preferences } from "~~/server/DB/entity/Preferences.js";
import { findBy } from "~~/server/utils/request.helper";
import { createIdIsRequiredError } from "~~/server/utils/responseErrors.helper";

export default defineEventHandler(async (event) => {
	const id: number = parseInt(event.context.params?.id || "0");
	createIdIsRequiredError(id);

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const pref = await findBy(Preferences, { id });

	if (!pref) {
		throw createError({
			statusCode: 404,
			statusMessage: "Preferences not found",
		});
	}

	return pref;
});
