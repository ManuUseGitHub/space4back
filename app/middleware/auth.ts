export default defineNuxtRouteMiddleware((to) => {
	if (to.path === "/connexion") return;

	const user = useState("user").value;
	if (!user) {
		return navigateTo(`/connexion?url=${to.fullPath}`);
	}
});
