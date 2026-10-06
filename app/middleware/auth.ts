export default defineNuxtRouteMiddleware(async to => {
    if (to.path === "/connexion") return;

    const user = useState("user", async () => {
        return await refreshUserStateWithSession();
    });

    if (!user) {
        const connectionUrl = `/syngularity/connexion?url=/${useSegments("bougs", to.fullPath)}`;

        return navigateTo(useExternalUrlResolver(connectionUrl), { external: true });
    }
});

export const refreshUserStateWithSession = async () => {
    const user: any = useState("user");
    console.log("USER", user)
    if (user.value) {
        return user.value;
    }

    const session: any = await $fetch("/api/session")
    if (!session) {
        return null;
    }

    const value = await $fetch(`/userinfo/user-info/u/${session.id}`, {
        credentials: "include"
    });
    useState("user", () => {
        return value;
    });
    console.log(value);
    return value;
};
