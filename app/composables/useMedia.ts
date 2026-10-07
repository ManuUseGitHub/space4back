export const useMedia = async (DEFAULT_IMAGE: string, url: string, userId?: string | string[]) => {
    const route = useRoute();
    const id = userId || route.params.id;
    const toast = useToast();

    return usePreviewImage({
        src: ref<string | ArrayBuffer | null>(),
        DEFAULT_IMAGE: DEFAULT_IMAGE,
        media: ref(await mediaFromData(url.replace(/\[ID\]/, `${id}`))),
        fileupload: ref(),
        toast,
        id
    });
};

export function usePreviewImage({
    src,
    DEFAULT_IMAGE,
    media,
    fileupload,
    toast,
    id
}: {
    src: Ref<any, any>;
    DEFAULT_IMAGE: string;
    media: Ref<FetchImage, FetchImage>;
    fileupload: Ref<any, any>;
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
                detail: "Please select a banner first."
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", fileupload.value.files[0]);

        try {
            const res = await $fetch(`/api/banner/${id}`, {
                method: "POST",
                body: formData
            });
            toast.add({
                severity: "success",
                summary: "Uploaded",
                detail: "Profile picture updated!",
                life: 3000,
                closable: false
            });

            src.value = null;
            media.value.mediaMimeType = res.mediaBundle.mediaMimeType;
            media.value.media = imageFromBuffer(res.mediaBundle.media); // backend should return the uploaded image URL
        } catch (err) {
            toast.add({
                severity: "error",
                summary: "Error",
                detail: "Upload failed."
            });
        }
    };

    const previewImage = computed(() => {
        return !src.value && !media.value.media
            ? DEFAULT_IMAGE
            : src.value != null
            ? src.value
            : `data:${media.value.mediaMimeType || "image/jpeg"};base64,${media.value.media}`;
    });

    const shouldDisplaySendButton = computed(() => src.value != null);

    const changeStyleOfPreviewImage = computed(() => (src.value != null ? "filter: grayscale(100%)" : ""));

    const onFileSelect = (event: any) => {
        const file = event.files[0];
        const reader = new FileReader();

        reader.onload = async e => {
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
        previewImage,
        shouldDisplaySendButton,
        changeStyleOfPreviewImage
    };
}
