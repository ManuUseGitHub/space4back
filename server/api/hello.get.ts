export default defineEventHandler(async (event) => {
	await sleep(1000);
	return sendError(
		event,
		createError({ statusCode: 500, statusMessage: "Something went wrong!" })
	);
	return [
		{
			id: 1,
			title: "learn Nuxt",
			done: false,
		},
		{
			id: 2,
			title: "Learn Vue",
			done: false,
		},
		{ id: 3, title: "Learn TypeScript", done: false },
		{ id: 4, title: "Learn TailwindCSS", done: false },
		{ id: 5, title: "Learn Pinia", done: false },
		{ id: 6, title: "Learn Prisma", done: false },
		{ id: 7, title: "Learn tRPC", done: false },
		{ id: 8, title: "Learn Nuxt Auth", done: false },
		{ id: 9, title: "Learn Deployment", done: false },
	];
});
function sleep(millis: number) {
	return new Promise((resolve) => setTimeout(resolve, millis));
}
