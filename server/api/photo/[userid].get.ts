import { User } from "~~/server/DB/entity/User.js";
import { findBy } from "~~/server/utils/request.helper";

export default defineEventHandler(async (event) => {
	const id = createIdIsRequiredError(event.context.params?.userid);
	initializeDataSource(event);
	const { photo, photoMimeType, serviceImageUrl } = {
		...(await findBy(User, { id }, [
			"user.photoMimeType",
			"user.photo",
			"user.serviceImageUrl",
		])),
	};
	return { photo, photoMimeType, serviceImageUrl };
});
