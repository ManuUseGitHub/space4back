import { StatusCodes } from "http-status-codes";

export const invalidateErros = (
	issued: any,
	error: { code: string; path: string[]; message: string }[]
) => {
	if (error.length) {
		const log = { issued: issued.data, error };
		logIt(JSON.stringify(log, null, 2), "error");
		return {
			success: false,
			statusCode: StatusCodes.PRECONDITION_FAILED,
			error,
		};
	}
	return { success: true, statusCode: StatusCodes.NO_CONTENT };
};

export const pushError = (
	zPartial: { code: string; path?: string[]; message: string },
	error: { code: string; path: string[]; message: string }[],
	paths: string[] = []
) => {
	if (!paths.length) {
		error.push(zPartial as any);
	}
	paths.forEach((p) => {
		error.push({ ...zPartial, path: [p] });
	});
};
