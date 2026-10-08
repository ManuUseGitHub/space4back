import { defineEventHandler } from "h3";
import { USE } from "~~/server/DB/entity/interfaces";
import { FileWeightMetas, parseUse, postMedia } from "~~/server/utils/medias.helper";

export default defineEventHandler(async event => {
    const use = parseUse(event.context.params?.use || "") || undefined;

    if (!/^\d$/g.test(`${use}`)) {
        event.respondWith(new Response("not a valid use for this media", { status: 406 }));
    }
    let metas = {} as FileWeightMetas;
    switch (use) {
        case USE.PROFILE:
            metas = getMetasForProfile(use);
            break;
        case USE.BANNER:
            metas = getMetasForBanner(use);
            break;
        default:
            event.respondWith(new Response("not supported use for given media", { status: 406 }));
            break;
    }
    return await postMedia(event, metas);
});

const getMetasForProfile = (use: USE): FileWeightMetas => {
    return {
        max2XlMB: 10,
        maxLMB: 5,
        maxMMB: 2,
        maxSMB: 1,
        use
    };
};

const getMetasForBanner = (use: USE): FileWeightMetas => {
    return {
        max2XlMB: 10,
        maxLMB: 8,
        maxMMB: 4,
        maxSMB: 2,
        rescale: 0.66,
        use
    };
};
