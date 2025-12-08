import { User } from "~~/server/DB/entity/User.js";
import { findBy } from "~~/server/utils/request.helper";

export default defineEventHandler(async (event) => {
	const id = createIdIsRequiredError(event.context.params?.userid);
	initializeDataSource(event);
	const { banner, bannerMimeType } = {
		...(await findBy(User, { id }, ["user.bannerMimeType", "user.banner"])),
	};
	return { banner, bannerMimeType };
});
