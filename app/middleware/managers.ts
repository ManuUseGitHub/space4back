import type { UserEntity } from "~~/server/DB/entity/interfaces";

export default defineNuxtRouteMiddleware(to => {
    const user = useState("user").value as UserEntity;
    if (user) {
        const { role: roles } = user;
        if (!roles.length || !roles.includes("admin")) {
            return navigateTo(`/403?url=${to.fullPath}`);
        }
    }
});
