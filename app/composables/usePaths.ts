export const useSegments = (... segments : any) : string => {
    return segments.join("/").replaceAll(/\/+/g, "/")
} 