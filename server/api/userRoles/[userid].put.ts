import { UserEntity } from "~~/server/DB/entity/interfaces";
import { zUpdateRoles } from "~~/server/utils/validators/zods";
import { findUserById, updateUser } from "~~/server/DB/dataAccess/users/user";

const findSuperAdminRole = (role: string) => {
    return role.split(",").find(r => r == ROLES.SUPER_ADMIN);
};
const unChangedSuperAdminRoleSet = (roles: string[], oldRoleString: string) => {
    const superadminRole = findSuperAdminRole(oldRoleString);
    return new Set([superadminRole, ...roles.filter(r => r != ROLES.SUPER_ADMIN)]);
};

const filterUnexistingRoles = (roles: string[]) => {
    const ROLES_VALUES: string[] = Object.values(ROLES);
    return roles.filter(k => ROLES_VALUES.includes(k));
};

/**
 * Provides the list of roles that doesn't contain SUPER_ADMIN so this roles is not modified by accident
 * @param roles
 * @param old
 * @returns
 */
const getSafeRoles = async (roles: string[], old: UserEntity) => {
    return Array.from(unChangedSuperAdminRoleSet(roles, old.role))
        .filter(x => x)
        .join(",");
};

export default defineEventHandler(async event => {
    const result = await initializeDataSourceValid(event, zUpdateRoles);
    const id: string = event.context.params?.userid || "0";

    if (result.success) {
        const oldUser: UserEntity = await findUserById(id);
        const patch = { role: await getSafeRoles(filterUnexistingRoles(result.data.roles), oldUser) };
        return updateUser(patch, result, oldUser);
    }
    return createInvalidDataError(event);
});
