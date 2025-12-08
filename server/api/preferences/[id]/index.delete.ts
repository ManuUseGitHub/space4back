import { AppDataSource } from "~~/server/DB/data-source.js";
import { Preferences } from "~~/server/DB/entity/Preferences";
import { conclude } from "~~/server/utils/request.helper";
import { createIdIsRequiredError } from "~~/server/utils/responseErrors.helper";

export default defineEventHandler(async (event) => {
	const id = parseInt(event.context.params?.id || "0");
	createIdIsRequiredError(id);

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}
	return await conclude(
		AppDataSource.getRepository(Preferences).delete({ id }),
		() => {
			return `${id} has been deleted`;
		}
	);
});
