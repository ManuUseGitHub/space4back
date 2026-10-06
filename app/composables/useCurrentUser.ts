export const useCurrentUser = () => {
    return useState<any>("user", () => undefined);
};
