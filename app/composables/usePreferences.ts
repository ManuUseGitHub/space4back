import type { CookieRef } from "#app";

export type ColorModes = {
    preference: string | CookieRef<string | null | undefined>;
}
export const useColorMode = () => {
    const lightMode = useCookie("lightMode");
    const theme = /light|dark/.test(`${lightMode}`)?lightMode:"";
    return { preference:theme }
}