import { deleteSessionCookie } from "~~/server/utils/session";

export default defineEventHandler((event) => {
	deleteSessionCookie(event);
	return { success: true };
});
