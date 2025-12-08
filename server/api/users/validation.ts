import { UserEntity } from "~~/server/DB/entity/interfaces";
import { User } from "~~/server/DB/entity/User";
import { invalidateErros, pushError } from "~~/server/DB/utils";

async function invalidateExistingUser(
	newUser: UserEntity,
	result: any,
	validation: { code: string; path: string[]; message: string }[]
) {
	newUser.birthDate = new Date(Date.parse(result.data.birthDate));

	if ((await findBy(User, { mailAddress: newUser.mailAddress })) != undefined) {
		pushError(
			{
				code: "existing",
				path: ["mailAddress"],
				message: "An user with the same email already exists",
			},
			validation
		);
	}
}

async function invalidateTooYoungUser(
	result: any,
	validation: { code: string; path: string[]; message: string }[]
) {
	const parsed = new Date(Date.parse(result.data.birthDate));
	const age = ageFromDate(parsed);
	const adultAge = 18;
	if (age < adultAge) {
		pushError(
			{
				code: "too_young",
				path: ["birthDate"],
				message: `Only adults can register ... age : ${age} year(s) old`,
			},
			validation
		);
	}
}

export const validateUser = async (newUser: UserEntity, result: any) => {
	const validation: { code: string; path: string[]; message: string }[] = [];
	await Promise.all([
		invalidateExistingUser(newUser, result, validation),
		invalidateTooYoungUser(result, validation),
	]);
	return invalidateErros(result, validation);
};
