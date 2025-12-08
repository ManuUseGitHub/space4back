import jwt from "jsonwebtoken";
import { setSessionCookie } from "~~/server/utils/auth";
import { searchUsers } from "~~/server/utils/dsource";
import { validateCredentials } from "./validation";

const JWT_SECRET = process.env.JWT_SECRET;

export default defineEventHandler(async (event) => {
	const result = await initializeDataSourceValid(event, zLoginAccount);

	if (result.success) {
		const { email } = result.data;

		const users = await searchUsers({ mailAddress: email });

		const validated = await validateCredentials(users, result);
		if (!validated.success) {
			return validated;
		} else {
			const matched = users[0];
			const user: any = await getSessionUser(matched.id);
			if (user) {
				const sessionToken = jwt.sign(user, JWT_SECRET!, {
					expiresIn: "24h",
				});
				setSessionCookie(event, sessionToken);

				return { success: true };
			}
		}

		return { success: false };
	}
});
