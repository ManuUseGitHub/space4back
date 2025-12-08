import { AppDataSource } from "../../DB/data-source";
import { User } from "../../DB/entity/User";
import { v4 as uuidv4 } from "uuid";
import type { UserEntity } from "../../DB/entity/interfaces";
import { validateUser } from "./validation";
import { dataBaseError } from "../../utils/responseErrors.helper";
import {
	conclude,
	initializeDataSourceValid,
} from "../../utils/request.helper";

export default defineEventHandler(async (event) => {
	const result = await initializeDataSourceValid(event, zRegisterUser);
	let { success, error } = result;
	if (!success) {
		return { error: JSON.parse(error!.message), success };
	}

	const newUser: UserEntity = newUserWithPreferences({
		...result.data,
		verified: false,
		role: "user",
		id: uuidv4(),
	});

	const validated = await validateUser(newUser, result);
	console.log(validated);
	if (validated.success) {
		return {
			success: await conclude(
				AppDataSource.getRepository(User).save(newUser),
				(data) => {
					return data;
				},
				dataBaseError
			),
		};
	}
	return validated;
});

const DEFAULT_THEME_PREFERENCES = {
	theme: "system",
	thDark: colorThemes.find((c) => c.name == "classic dark")!.code,
	thLight: colorThemes.find((c) => c.name == "classic light")!.code,
	thPrefered: colorThemes.find((c) => c.name == "classic dark")!.code,
};
function newUserWithPreferences(data: any): UserEntity {
	const newUser = {
		...data,
		preferences: DEFAULT_THEME_PREFERENCES,
	};

	return newUser;
}
