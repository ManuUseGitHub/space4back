export default defineEventHandler(async event => {
    try {
        const cookie = getHeader(event, "cookie") ?? "";
        const csrfToken = getHeader(event, "x-xsrf-token") ?? "";

        await $fetch("/sso/session/logout", {
            method: "POST",
            headers: {
                cookie,
                "X-XSRF-TOKEN": csrfToken
            }
        });
        if (event.context.session) {
            event.context.session = null;
        }

        return { success: true };
    } catch (error) {
        throw error;
    }
});
