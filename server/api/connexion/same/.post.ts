export default defineEventHandler(async (event) => {
	const { id } = await readBody(event);
	return event.context.user.id == id; // ← HERE is your user
});
