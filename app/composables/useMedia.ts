export const useMedia = async (DEFAULT_IMAGE: string, fileupload: any, url:  string, userId?: string | string[]) => {
    const route = useRoute();
    const id = userId || route.params.id;
    const toast = useToast();

    return usePreviewImage({
        src: ref<string | ArrayBuffer | null>(),
        DEFAULT_IMAGE: DEFAULT_IMAGE,
        media: ref(await mediaFromData(url.replace(/\[ID\]/, `${id}`))),
        fileupload,
        toast,
        id
    });
};