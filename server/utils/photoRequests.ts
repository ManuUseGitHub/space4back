import { FetchImageDTO } from "~~/server/DB/DTOs";
import { UserImage } from "~~/server/DB/entity/UserImage";
import { QueryConditions } from "./request.helper";

export const getImage = async (event: any,search:any, SIZE: string,qConditions:QueryConditions = {} ) => {
    const definitiveSize = SIZE || "";
    initializeDataSource(event);
    const photo = {
        ...(await findBy(
            UserImage,
            search,
            [
                "userimage.mediaMimeType",
                "userimage.media" + definitiveSize,
                "userimage.url",
                "userimage.postDate",
                "userimage.size"
            ],qConditions
        ))
    };

    return {
        media: photo["media" + definitiveSize],
        mediaMimeType: photo.mediaMimeType,
        size: photo.size,
        url: photo.url,
        postDate: photo.postDate
    } as FetchImageDTO;
};
