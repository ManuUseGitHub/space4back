export const getCaptchaKey = () => {
    const config = useRuntimeConfig();
    return config.public.recaptchaSiteKey;
}