export const useExternalUrlResolver = (path: string) => {
    if (path.startsWith("/syngularity/")) {
        return `http://localhost:8401/${path.substring("/syngularity/".length)}`;
    }

    return path;
};
