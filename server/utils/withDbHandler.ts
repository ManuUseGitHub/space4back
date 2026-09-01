import { H3Event, createError } from "h3";

export function withDbHandler<T>(handler: (event: H3Event) => Promise<T>) {
	return async (event: H3Event): Promise<T> => {
		try {
			return await handler(event);
		} catch (err) {
			// Centralized DB error handling
			logDataBaseError(err);

			// Option 1: return a fallback response
			return {
				success: false,
				data: null,
			} as T;
		}
	};
}
