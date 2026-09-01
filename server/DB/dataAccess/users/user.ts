import { AppDataSource } from "../../data-source";
import { UserEntity } from "../../entity/interfaces";
import { User } from "../../entity/User";
import { sanitizeObjectFrom } from "~~/server/utils/dsource";

export const getUserProfileInfos = async (event: any, userId: string | undefined) => {
    createIdIsRequiredError(userId);
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    //return await findById(User, { id }, ["user.id"]);

    const raw = await AppDataSource.getRepository(User)
        .createQueryBuilder("u")
        .leftJoinAndSelect("u.preferences", "p")
        .select(SELECT_USER_WITH_PREFERENCES)
        .where("u.id = :id", { id: userId })
        .getRawOne();

    const remap: Record<string, any> = {};
    Object.keys(raw).forEach(k => (remap[k.replace(/^._/, "")] = raw[k]));
    return remap;
};

/*export const updateUser = async (event:any,result:any,userId:string|undefined) => {
    const old: UserEntity = await findBy(User, {
                id:userId
            });
            const safeRoles = await getSafeRoles({ ...result.data }, old);
            return await conclude(
                AppDataSource.getRepository(User).update(
                    {
                        id:userId
                    },
                    sanitizeObjectFrom({ role: safeRoles, id:userId }, old!)
                ),
    
                (data: RegisterUserDTO) => {
                    updateSystem(result);
                    return `${JSON.stringify(data)}`;
                }
            );
}*/

export const findUserById = async (userId: string | undefined) => {
    return await findBy(User, {
        id: userId
    });
};

export const updateUser = async (
    patch: any,
    result: any,
    old: UserEntity
) => {
    const id = old.id;
    return await conclude(
        AppDataSource.getRepository(User).update(
            {
                id
            },
            sanitizeObjectFrom({ ...patch, id }, old)
        ),

        (data:any) => {
            updateSystem(result);
            return data;
        },
    );
};
