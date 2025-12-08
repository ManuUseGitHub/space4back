import { AppDataSource } from "~~/server/DB/data-source.js";
import { UserDTO } from "~~/server/DB/DTOs";
import { Preferences } from "~~/server/DB/entity/Preferences";
import { User } from "~~/server/DB/entity/User.js";
import {
	conclude,
	findBoundedToUser,
	findBy,
} from "~~/server/utils/request.helper";
import { createIdIsRequiredError } from "~~/server/utils/responseErrors.helper";

export default defineEventHandler(async (event) => {
	const id: string = event.context.params?.userid || "0";
	const found = (await findBy(User, { id })) as UserDTO;

	createIdIsRequiredError(id);

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	await deleteBoundedPreferences(id);

	return await conclude(
		AppDataSource.getRepository(User).delete({ id }),
		() => {
			const { lastName, firstName } = found;
			return `${lastName.toUpperCase()} ${firstName} has been deleted`;
		}
	);
});

const deleteBoundedPreferences = async (id: string) => {
	const boundedPreferences = await findBoundedToUser(Preferences, id);
	await AppDataSource.getRepository(Preferences).delete({
		id: boundedPreferences?.id,
	});
};
