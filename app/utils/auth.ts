export const signout = async () => {
    const csrf = await useCSRF("sso");
    await $fetch("/api/session/logout", {
        method: "POST",
        credentials: "include",
        headers: {
        "X-XSRF-TOKEN": csrf.token
    }
    });
};
