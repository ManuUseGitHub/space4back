import { imageFromBuffer } from "~/utils/common/misc";
const DEFAULT_IMAGE = "/img/unknown-picture.svg";
export async function usePreviewImage(id?: string) {
    const photo: FetchImage = await $fetch(`/api/medias/${id}/f/PROFILE-S`);
    const meta: FetchImage = id ? photo : ({} as any);
    meta.media = meta.media ? imageFromBuffer(meta.media) : "";

    return !meta.media
        ? defaultImageOrService(meta)
        : `data:${meta.mediaMimeType || "image/jpeg"};base64,${meta.media}`;
}
function defaultImageOrService(meta: FetchImage): any {
    return meta.mediaMimeType == "url" && meta.url ? meta.url : DEFAULT_IMAGE;
}
