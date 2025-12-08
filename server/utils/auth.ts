export const setSessionCookie = (event:any, sessionToken: string) => {
	setCookie(event, "session", sessionToken, {
		httpOnly: true,
		secure: isProd, // secure only in prod
		sameSite: isProd ? "lax" : "lax",
		domain: isProd ? ".luniversdemm.store" : "localhost",
		maxAge: 24 * 60 * 60,
		path: "/",
	});
};
