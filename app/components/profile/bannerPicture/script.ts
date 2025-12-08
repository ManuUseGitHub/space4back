import type { useToast } from "primevue";
import { computed, type Ref } from "vue";
import { imageFromBuffer } from "~/utils/common/misc";
import type { UserProfileBannerPictureDTO } from "~~/server/DB/DTOs";
const DEFAULT_IMAGE =
	"/img/vecteezy_architecture-and-interior-concept-empty-room-and-wood-panels_31147772.jpg";
export function usePreviewImage({
	src,
	state,
	fileupload,
	toast,
	id,
}: {
	src: Ref;
	state: Ref<UserProfileBannerPictureDTO, UserProfileBannerPictureDTO>;
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
				detail: "Please select a banner first.",
			});
			return;
		}

		const formData = new FormData();
		formData.append("file", fileupload.value.files[0]);

		try {
			const res = await $fetch(`/api/banner/${id}`, {
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

			const { banner, bannerMimeType } = res.bannerBundle;
			state.value.bannerMimeType = bannerMimeType;
			state.value.banner = imageFromBuffer(banner); // backend should return the uploaded image URL
		} catch (err) {
			toast.add({
				severity: "error",
				summary: "Error",
				detail: "Upload failed.",
			});
		}
	};
	const hasBanner = computed(() => state.value?.banner);

	const previewImage = computed(() => {
		return !src.value && !state.value.banner
			? DEFAULT_IMAGE
			: src.value != null
			? src.value
			: `data:${state.value.bannerMimeType || "image/jpeg"};base64,${
					state.value.banner
			  }`;
	});

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
		hasBanner,
		previewImage,
		shouldDisplaySendButton,
		changeStyleOfPreviewImage,
	};
}
