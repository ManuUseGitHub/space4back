export default defineEventHandler(async (event) => {
	if (!event.context.user) return false;
	
	const { id } = await readBody(event);
	return event.context.user.id == id; // ← HERE is your user
});
