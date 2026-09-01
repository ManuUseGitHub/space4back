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
	deleteCookie(event, "session", {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? "lax" : "lax",
		domain: isProd ? ".luniversdemm.store" : "localhost",
		path: "/",
	});
};

export const getSessionCookie = (event: any) => {
	return getCookie(event, "session");
};
