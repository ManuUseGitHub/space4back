import { imageFromBuffer } from "~/utils/common/misc";
import type { UserProfilePictureDTO } from "~~/server/DB/DTOs";
const DEFAULT_IMAGE = "/img/unknown-picture.svg";
export async function usePreviewImage(id?: string) {
	const meta: UserProfilePictureDTO = id
		? await $fetch("/api/photo/" + id)
		: {};
	meta.photo = meta.photo ? imageFromBuffer(meta.photo) : "";

	return !meta.photo
		? defaultImageOrService(meta)
		: `data:${meta.photoMimeType || "image/jpeg"};base64,${meta.photo}`;
}
function defaultImageOrService(meta: UserProfilePictureDTO): any {
	return meta.photoMimeType == "url" && meta.serviceImageUrl
		? meta.serviceImageUrl
		: DEFAULT_IMAGE;
}
