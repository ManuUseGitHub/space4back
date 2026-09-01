import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default defineEventHandler((event) => {
	const session = getCookie(event, "session");
	if (!session) return;

	try {
		const user = jwt.verify(session, JWT_SECRET!);
		event.context.user = user;
	} catch {
		deleteCookie(event, "session", {
			path: "/",
			domain:
				process.env.NODE_ENV === "production"
					? ".luniversdemm.store"
					: "localhost",
		});
	}
});
