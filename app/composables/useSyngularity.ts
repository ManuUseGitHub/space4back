export const useSsoSession = async () => {
    try {
        return await $fetch("/sso/session", {
            credentials: "include"
        });
    } catch (error:any){
        return null;
    }
};

export const useCSRF = async (target:string) => {
    return (await $fetch(`/${target}/csrf`, {
            method: "GET",
            credentials: "include"
        })) as CsrfResponse;
}