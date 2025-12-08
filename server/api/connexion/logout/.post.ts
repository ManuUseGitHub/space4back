export default defineEventHandler((event) => {
	deleteCookie(event, "session");
	return { success: true };
});
