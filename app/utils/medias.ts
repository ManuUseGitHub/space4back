export const mediaFromData = async (route: string) => {
    const fetched: any = await $fetch(route);
    return {
        media: fetched.media ? imageFromBuffer(fetched.media) : "",
        mediaMimeType: fetched.mediaMimeType
    };
};