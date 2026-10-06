import { AppSession } from "./types";
const isProd = process.env.NODE_ENV === "production";

export const setSessionCookie = (event: any, sessionToken: string) => {
	const sess:AppSession = {
		httpOnly: true,
		secure: isProd, // secure only in prod
		sameSite: isProd ? "lax" : "lax",
		domain: isProd ? ".luniversdemm.store" : "localhost",
		maxAge: 24 * 60 * 60,
		path: "/",
	};
	logIt(sess);
	setCookie(event, "session", sessionToken, sess);
};

export const deleteSessionCookie = (event: any) => {
	event.context.session = null;
};

export const getSessionCookie = (event: any) => {
	return getCookie(event, "session");
};

export const getCSRF = async (target: string) => {
    return (await $fetch(`/${target}/csrf`, {
        method: "GET",
        credentials: "include"
    })) as CsrfResponse;
};

export const getCurrentSession = async (event:any) => {
    if (event.context.session !== undefined) {
        return event.context.session;
    }

    try {
        const session = await $fetch("/sso/session", {
            headers: {
                cookie: getHeader(event, "cookie") ?? ""
            }
        });

        event.context.session = session;

        return session;
    } catch {
        event.context.session = null;
        return null;
    }
};