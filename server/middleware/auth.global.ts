import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export default defineEventHandler(async (event) => {
	const session = getCookie(event, "session");
	if (!session) {
		if (
			!/connexion|\/home|\/create|\/api/.test(
				event.node.req.url!
			)
		) {
			return sendRedirect(event, `/connexion?url=${event.node.req.url}`, 307);
		}
		return;
	}

	try {
		const user = jwt.verify(session, JWT_SECRET!);
		event.context.user = user;
	} catch {
		// Invalid or expired
		deleteCookie(event, "session");

		if (/api\/(log|connexion|photo|banner)\/?/.test(event.node.req.url!)) {
			return;
		}
		throw createError({
			statusCode: 401,
			message: "Invalid or expired session",
		});
	}
});
