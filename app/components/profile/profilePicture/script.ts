import { computed } from "vue";
import { imageFromBuffer } from "~/utils/common/misc";
import type { UserProfilePictureDTO } from "~~/server/DB/DTOs";
const DEFAULT_IMAGE = "/img/photo-1585676737728-432f58d5fdba.jpeg";
export function usePreviewImage({
	src,
	state,
	fileupload,
	toast,
	id,
}: {
	src: Ref;
	state: Ref<UserProfilePictureDTO, UserProfilePictureDTO>;
	fileupload: Ref;
	toast: ReturnType<typeof useToast>;
	id: string | string[] | undefined;
}) {
	const cancel = () => {
		src.value = null;
	};
	const upload = async () => {
		if (!fileupload.value || !fileupload.value.files.length) {
			toast.add({
				severity: "warn",
				summary: "No file",
				detail: "Please select a photo first.",
			});
			return;
		}

		const formData = new FormData();
		formData.append("file", fileupload.value.files[0]);

		try {
			const res = await $fetch(`/api/photo/${id}`, {
				method: "POST",
				body: formData,
			});
			toast.add({
				severity: "success",
				summary: "Uploaded",
				detail: "Profile picture updated!",
				life: 3000,
				closable: false,
			});

			src.value = null;

			const { photo, photoMimeType } = res.photoBundle;
			state.value.photoMimeType = photoMimeType;
			state.value.photo = imageFromBuffer(photo); // backend should return the uploaded image URL
		} catch (err) {
			toast.add({
				severity: "error",
				summary: "Error",
				detail: "Upload failed.",
			});
		}
	};
	const hasPhoto = computed(() => !!state.value.photo);

	const previewImage = computed(() =>
		!src.value && !state.value.photo
			? defaultImageOrService(state)
			: pendingImageOrPersistedImage(state, src)
	);

	const shouldDisplaySendButton = computed(() => src.value != null);

	const changeStyleOfPreviewImage = computed(() =>
		src.value != null ? "filter: grayscale(100%)" : ""
	);

	const onFileSelect = (event: any) => {
		const file = event.files[0];
		const reader = new FileReader();

		reader.onload = async (e) => {
			if (e.target) {
				src.value = e.target.result;
			}
		};

		reader.readAsDataURL(file);
	};

	return {
		onFileSelect,
		upload,
		cancel,
		hasPhoto,
		previewImage,
		shouldDisplaySendButton,
		changeStyleOfPreviewImage,
	};
}
function defaultImageOrService(
	state: globalThis.Ref<UserProfilePictureDTO, UserProfilePictureDTO>
): any {
	return state.value.photoMimeType == "url" && state.value.serviceImageUrl
		? state.value.serviceImageUrl
		: DEFAULT_IMAGE;
}

function pendingImageOrPersistedImage(
	state: globalThis.Ref<UserProfilePictureDTO, UserProfilePictureDTO>,
	src: globalThis.Ref<any, any>
): any {
	return src.value != null
		? src.value
		: `data:${state.value.photoMimeType || "image/jpeg"};base64,${
				state.value.photo
		  }`;
}
