export const useCSRF = async (target: string) => {
    return (await $fetch(`/${target}/csrf`, {
        method: "GET",
        credentials: "include"
    })) as CsrfResponse;
};