import { H3Event, EventHandlerRequest } from "h3";
import { FetchImageDTO } from "~~/server/DB/DTOs";
import { USE } from "~~/server/DB/entity/interfaces";
import { User } from "~~/server/DB/entity/User.js";
import { parseUse } from "~~/server/utils/medias.helper";
import { findBy } from "~~/server/utils/request.helper";

export default defineEventHandler(async event => {
    const id = createIdIsRequiredError(event.context.params?.userid);
    const format = (event.context.params?.format || "-").split("-");
    const use = parseUse(format[0]) || undefined;
    const size = (format[1] || "").replace(/2X/g, "XX");
    if (!/^\d$/g.test(`${use}`)) {
        event.respondWith(new Response("not a valid use for an image", { status: 406 }));
    }
    if (size && !/^(?:L|M|S|XXL)$/g.test(size)) {
        event.respondWith(new Response("not a valid size for an image", { status: 406 }));
    }
    if (!size) {
        return await legacyMedia(event, id, use);
    }
    return await dynamicMedia(event, id, use, size);
});
const legacyMedia = async (event: H3Event<EventHandlerRequest>, id: string | number, use: USE | undefined) => {
    // TODO: replace with new api endpoint
    initializeDataSource(event);
    if (use == USE.PROFILE) {
        const { photo, photoMimeType, serviceImageUrl } = {
            ...(await findBy(User, { id }, ["user.photoMimeType", "user.photo", "user.serviceImageUrl"]))
        };
        return { media: photo, mediaMimeType: photoMimeType, url: serviceImageUrl } as FetchImageDTO;
    } else if (use == USE.BANNER) {
        const { banner, bannerMimeType } = {
            ...(await findBy(User, { id }, ["user.bannerMimeType", "user.banner"]))
        };
        return { media: banner, mediaMimeType: bannerMimeType } as FetchImageDTO;
    }
};

const dynamicMedia = async (
    event: H3Event<EventHandlerRequest>,
    id: string | number,
    use: USE | undefined,
    size: string
) => {
    if (!(use == USE.PROFILE || use == USE.BANNER)) {
        event.respondWith(new Response("not a supported use for an image: " + USE[use!], { status: 406 }));
    }
    return (await getImage(event, { userId: id, use: `${use}` }, size, {
        orderChain: [{ sort: "userimage.postDate", order: "DESC" }],
        andConditions: ["userimage.postDate IS NOT NULL"]
    })) as FetchImageDTO;
};
