export type AppSession = {
	httpOnly: boolean;
	secure: boolean;
	sameSite: boolean | "lax" | "strict" | "none" | undefined;
	domain: string;
	maxAge: number;
	path: string;
};

export type TokenProperties = {
	valid: boolean;
	invalidReason: string;
	hostname: string;
	androidPackageName: string;
	iosBundleId: any;
	action: string;
	createTime: Date;
};

export type CsrfResponse = {
    headerName: string;
    parameterName: string;
    token: string;
};