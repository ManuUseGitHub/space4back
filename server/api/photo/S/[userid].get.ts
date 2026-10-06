import { UserImage } from "~~/server/DB/entity/UserImage.js";
import { findBy } from "~~/server/utils/request.helper";

export default defineEventHandler(async event => {
    const userId = createIdIsRequiredError(event.context.params?.userid);
    initializeDataSource(event);
    const { mediaS, mediaMimeType, serviceImageUrl } = {
        ...(await findBy(UserImage, { userId }, ["userimage.mediaMimeType", "userimage.mediaS"]))
    };
    return { mediaS, mediaMimeType, serviceImageUrl };
});
