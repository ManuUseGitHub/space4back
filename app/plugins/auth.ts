export default defineNuxtPlugin(() => {
	const user = useState("user");

	if (import.meta.server) {
		const event = useRequestEvent();
		user.value = event?.context.user || null;
	}
});
