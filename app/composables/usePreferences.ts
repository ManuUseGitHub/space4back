export const useColorMode = () => {
    const lightMode = useCookie("lightMode");
    const theme = /light|dark/.test(`${lightMode}`)?lightMode:"";
    return { preference:theme }
}