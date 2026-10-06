import { UserImage } from "~~/server/DB/entity/UserImage";

export default defineEventHandler(async (event) => {
	const id = createIdIsRequiredError(event.context.params?.userid);
	initializeDataSource(event);
	const { photo, photoMimeType, serviceImageUrl } = {
		...(await findBy(UserImage, { id }, [
			"userimage.mediaMimeType",
			"userimage.media",
			"userimage.serviceImageUrl",
		])),
	};
	return { photo, photoMimeType, serviceImageUrl };
});
