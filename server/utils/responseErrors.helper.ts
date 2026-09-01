import { H3Event, EventHandlerRequest } from "h3";
import { StatusCodes } from "http-status-codes";
import { lens } from "qlcodes";
import { success } from "zod";

export const createInvalidDataError = (
	event: H3Event<EventHandlerRequest>,
	reason: string = ""
) => {
	sendError(
		event,
		createError({
			statusCode: StatusCodes.PRECONDITION_FAILED,
			statusMessage: `Invalid data${reason ? " : " + reason : ""}`,
		})
	);
};

export const createIdIsRequiredError = (
	id: number | string | undefined | null
) => {
	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: "The ID is required",
		});
	}
	return id;
};

export const dataBaseError = (error: any) => {
	let copy = JSON.parse(JSON.stringify(error));
	if (copy.code) {
		copy.code = lens(copy.code);
	}
	logIt(copy, "error");
	throw createError({
		statusCode: 400,
		statusMessage: "database error ...",
	});
};

export const logDataBaseError = (error: any) => {
	if (error.code) {
		error.ql = lens(error.code);
		error.code = undefined;
	}
	logIt(error, "error");
};
