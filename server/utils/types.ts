export type AppSession = {
	httpOnly: boolean;
	secure: boolean;
	sameSite: boolean | "lax" | "strict" | "none" | undefined;
	domain: string;
	maxAge: number;
	path: string;
};