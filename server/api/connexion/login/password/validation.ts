import bcrypt from "bcryptjs";
import { UserEntity } from "~~/server/DB/entity/interfaces";
import { invalidateErros, pushError } from "~~/server/DB/utils";

async function invalidateServiceLinkedUser(
	users: UserEntity[],
	validation: { code: string; path: string[]; message: string }[]
) {
	const fetched = users[0];
	if (users.length && fetched.hashedPassword == null) {
		pushError(
			{
				code: "already_linked",
				path: ["mailAddress"],
				message: `The address is already linked to a service account. Try the other loging method`,
			},
			validation
		);
	}
}

async function invalidateMailAddressMissmatch(
	users: UserEntity[],
	validation: { code: string; path: string[]; message: string }[]
) {
	if (!users.length) {
		pushInvalideMailOrPassword(validation);
	}
}
async function invalidatePasswordMissmatch(
	users: UserEntity[],
	validation: { code: string; path: string[]; message: string }[],
	result: any
) {
	const { password } = result.data;

	const fetched = users[0];
	if (users.length && fetched.hashedPassword) {
		const valid = await bcrypt.compare(password, fetched.hashedPassword);
		if (!valid) {
			pushInvalideMailOrPassword(validation);
		}
	}
}

export const validateCredentials = async (users: UserEntity[], result: any) => {
	const validation: { code: string; path: string[]; message: string }[] = [];
	await Promise.all([
		invalidateMailAddressMissmatch(users, validation),
		invalidatePasswordMissmatch(users, validation, result),
		invalidateServiceLinkedUser(users, validation),
	]);
	return invalidateErros(result, validation);
};
function pushInvalideMailOrPassword(
	validation: { code: string; path: string[]; message: string }[]
) {
	pushError(
		{
			code: "credentials_missmatch",
			message: "Invalid email or password",
		},
		validation,
		["mailAddress", "password"]
	);
}
