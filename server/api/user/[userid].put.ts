import { createInvalidDataError } from "~~/server/utils/responseErrors.helper";
import {
	conclude,
	findBoundedToUser,
	findBy,
	initializeDataSourceValid,
} from "~~/server/utils/request.helper";

import { zUpdateUser } from "~~/server/utils/validators/zods";

import type { SystemEntity, UserEntity } from "~~/server/DB/entity/interfaces";
import type {
	RegisterUserDTO,
	WriteUserPreferencesDTO,
} from "~~/server/DB/DTOs";
import type { ZodSafeParseSuccess } from "zod";
import { AppDataSource } from "~~/server/DB/data-source.js";
import { User } from "~~/server/DB/entity/User.js";
import { Preferences } from "~~/server/DB/entity/Preferences";
import { System } from "~~/server/DB/entity/System";

export default defineEventHandler(async (event) => {
	const result = await initializeDataSourceValid(event, zUpdateUser);

	if (result.success) {
		const newUser: UserEntity = { ...result.data } as any;

		newUser.birthDate = new Date(Date.parse(result.data.birthDate));
		updatePreferences(result as any);
		const old = await findBy(User, {
			id: result.data.id,
		});
		return await conclude(
			AppDataSource.getRepository(User).update(
				{
					id: newUser.id,
				},
				sanitizeObjectFrom(newUser, old!)
			),

			(data: RegisterUserDTO) => {
				updateSystem(result as any);
				return `${JSON.stringify(data)}`;
			}
		);
	}
	return createInvalidDataError(event);
});
const updatePreferences = async (
	result: ZodSafeParseSuccess<WriteUserPreferencesDTO>
) => {
	const boundedPreferences = await findBoundedToUser(
		Preferences,
		result.data.id
	);
	await AppDataSource.getRepository(Preferences).update(
		{
			id: boundedPreferences?.id,
		},
		sanitizeObjectFrom(result.data, boundedPreferences!)
	);
};

const updateSystem = async (
	result: ZodSafeParseSuccess<WriteUserPreferencesDTO>
) => {
	const bounded = await findBoundedToUser(System, result.data.id);
	const sanitized: SystemEntity = sanitizeObjectFrom(
		result.data,
		bounded!
	) as any;
	sanitized.dateUpdate = new Date();
	if (bounded) {
		await AppDataSource.getRepository(System).update(
			{
				id: bounded?.id,
			},
			sanitized
		);
	} else {
		await AppDataSource.getRepository(System).save({
			userId: result.data.id,
			dateUpdate: new Date(),
		});
	}
};

export function sanitizeObjectFrom<T extends Object>(
	input: Record<string, any>,
	oldVersion: T
) {
	const result: { [x: string]: any } = {};
	const keys = Object.keys(oldVersion);
	keys.forEach((key) => {
		if (key != "id") {
			result[key] = input[key];
		}
	});
	return result;
}
