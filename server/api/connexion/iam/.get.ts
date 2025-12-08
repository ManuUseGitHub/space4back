export default defineEventHandler((event) => {
	return event.context.user || null; // ← HERE is your user
});
