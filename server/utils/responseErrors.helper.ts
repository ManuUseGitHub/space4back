import { H3Event, EventHandlerRequest } from "h3";
import { StatusCodes } from "http-status-codes";

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
	console.error(error);
	throw createError({
		statusCode: 400,
		statusMessage: "database error ...",
	});
};
