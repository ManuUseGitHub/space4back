import { AppDataSource } from "~~/server/DB/data-source.js";
import { User } from "../DB/entity/User";
import { Experience } from "../DB/entity/Experience";
import { constructCategories, constructLov } from "./categoriesAndLovHelper";
import {
    SELECT_EXPERIENCES_OF_USER,
    SELECT_PROFESSIONS,
    SELECT_SECTOR,
    SELECT_SESSION_USER_WITH_PREFERENCES,
    SELECT_SKILL_SECTOR_WITH_SECTOR,
    SELECT_USER_INFOS_FOR_EXPERIENCES,
    SELECT_USER_WITH_CREDENTIALS,
    SELECT_USER_WITH_PREFERENCES
} from "./selects";
import { Sector } from "../DB/entity/Sector";
import { Profession } from "../DB/entity/Profession";
import { SelectQueryBuilder } from "typeorm";
import { ZodSafeParseSuccess } from "zod";
import { WriteUserPreferencesDTO } from "../DB/DTOs";
import { System } from "../DB/entity/System";
import { SystemEntity } from "../DB/entity/interfaces";

export const getSessionUser = async (id: string) => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    //return await findById(User, { id }, ["user.id"]);

    const raw = await AppDataSource.getRepository(User)
        .createQueryBuilder("u")
        .leftJoinAndSelect("u.preferences", "p")
        .select(SELECT_SESSION_USER_WITH_PREFERENCES)
        .where("u.id = :id", { id })
        .getRawOne();

    const remap: Record<string, any> = {};
    remap["role"] = [];
    Object.keys(raw).forEach(k => {
        const key = k.replace(/^._/, "");
        if (key != "role") {
            remap[key] = raw[k];
        } else if (raw[k]) {
            remap[key] = raw[k].split(",").map((x: string) => x.trim());
        }
    });
    return remap;
};

export const searchUsers = async (search: any) => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    const alias = "u";
    return concatAndWhereConditions(
        AppDataSource.getRepository(User).createQueryBuilder(alias).select(SELECT_USER_WITH_CREDENTIALS),
        search,
        alias
    ).getMany();
};

export const getUserProfiles = async (event: any) => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    //return await findById(User, { id }, ["user.id"]);

    const raws = await AppDataSource.getRepository(User)
        .createQueryBuilder("u")
        .leftJoinAndSelect("u.preferences", "p")
        .select(SELECT_USER_WITH_PREFERENCES)
        .getRawMany();

    const remaps: Record<string, any>[] = [];
    raws.forEach(raw => {
        const remap: Record<string, any> = {};
        remap["role"] = [];
        Object.keys(raw).forEach(k => {
            const key = k.replace(/^._/, "");
            if (key != "role") {
                remap[key] = raw[k];
            } else if (raw[k]) {
                remap[key] = raw[k].split(",").map((x: string) => x.trim());
            }
        });
        remaps.push(remap);
    });
    return remaps;
};

export const getUserInfos = async (event: any, junctions: { junction: string; alias: string }[], select: string[]) => {
    const id = event.context.params?.userid;

    createIdIsRequiredError(id);
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    let query = AppDataSource.getRepository(User).createQueryBuilder("u");

    junctions.forEach(x => {
        query = query.leftJoinAndSelect(x.junction, x.alias);
    });
    const raw = await query.select(select).where("u.id = :id", { id }).getRawOne();
    const remap: Record<string, any> = {};
    Object.keys(raw).forEach(k => (remap[k.replace(/^._/, "")] = raw[k]));
    return remap;
};

export const getUserExperiencesNextOrder = async (userId: string) => {
    createIdIsRequiredError(userId);
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const raws = await AppDataSource.getRepository(Experience)
        .createQueryBuilder("e")
        .select(SELECT_EXPERIENCES_OF_USER)
        .where("e.userId = :userId", { userId })
        .getRawMany();

    const remaps: Record<string, any>[] = [];
    raws.forEach(raw => {
        const line: Record<string, any> = {};
        Object.keys(raw).forEach(k => (line[k.replace(/^._/, "")] = raw[k]));
        remaps.push(line);
    });

    return (raws.length ? Math.max(...(remaps.map(x => x.order) as number[])) : 0) + 1;
};

export const getUserExperiences = async (event: any) => {
    const id = event.context.params?.userid;

    const user = getUserInfos(event, [], SELECT_USER_INFOS_FOR_EXPERIENCES);

    createIdIsRequiredError(id);
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const raws = await AppDataSource.getRepository(Experience)
        .createQueryBuilder("e")
        .select(SELECT_EXPERIENCES_OF_USER)
        .where("e.userId = :id", { id })
        .getRawMany();

    const remaps: Record<string, any>[] = [];
    raws.forEach(raw => {
        const line: Record<string, any> = {};
        Object.keys(raw).forEach(k => (line[k.replace(/^._/, "")] = raw[k]));
        remaps.push(line);
    });

    return {
        ...(await user),
        userId: id,
        experiences: remaps.map(x => {
            const categories: any = {};
            if (x.categories) {
                x.categories = constructCategories(x, categories);
            } else {
                x.categories = [];
            }
            if (x.lov) {
                x.lov = Object.entries(constructLov(x, categories)).map(([_, value]) => value);
            } else {
                x.lov = [];
            }
            return x;
        })
    };
};

export const getSkillSectorsForSector = async (event: any) => {
    const id = event.context.params?.sectorId;
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const raws = await AppDataSource.getRepository(Sector)
        .createQueryBuilder("s")
        .leftJoinAndSelect("s.skillSectors", "sk")
        .select(SELECT_SKILL_SECTOR_WITH_SECTOR)
        .where({ id })
        .getRawMany();

    const remaps = rempRaws(raws);
    return remaps;
};

export const getProfessionsForSector = async (event: any) => {
    const id = event.context.params?.sectorId;
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const raws = await AppDataSource.getRepository(Profession)
        .createQueryBuilder("p")
        .select(SELECT_PROFESSIONS)
        .where("p.sectorId = :id", { id })
        .getRawMany();

    const remaps = rempRaws(raws);
    return remaps;
};

export const getSectors = async (event: any) => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const raws = await AppDataSource.getRepository(Sector).createQueryBuilder("s").select(SELECT_SECTOR).getRawMany();

    const remaps = rempRaws(raws);
    return remaps;
};

export const getProfessionsOfSkillSector = async (professionsIds: number[], sectorId: number) => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const professions =
        professionsIds.length > 0
            ? await AppDataSource.getRepository(Profession)
                  .createQueryBuilder("p")
                  .select(SELECT_PROFESSIONS)
                  .where("p.id IN (:...ids) ", {
                      ids: professionsIds
                  })
                  .getMany()
            : await AppDataSource.getRepository(Profession)
                  .createQueryBuilder("p")
                  .select(SELECT_PROFESSIONS)
                  .where({ sectorId })
                  .getMany();

    return professions;
};
function rempRaws(raws: any[]) {
    const remaps: { [x: string]: any }[] = [];
    raws.forEach(raw => {
        const line: { [x: string]: any } = {};
        Object.keys(raw).forEach(k => (line[k.replace(/^.+_/, "")] = raw[k]));
        remaps.push(line);
    });
    return remaps;
}

function concatAndWhereConditions(query: SelectQueryBuilder<any>, search: any, alias: string) {
    let cpt = 0;
    Object.entries(search).forEach(([column, value]) => {
        const parameter: any = {};
        parameter[column] = value;

        if (cpt++ == 0) {
            query = query.where(`${alias}.${column} = :${column}`, parameter);
        } else {
            query = query.andWhere(`${alias}.${column} = :${column}`, parameter);
        }
    });
    return query;
}

export const updateSystem = async (result: ZodSafeParseSuccess<WriteUserPreferencesDTO>) => {
    const bounded = await findBoundedToUser(System, result.data.id);
    const sanitized: SystemEntity = sanitizeObjectFrom(result.data, bounded!) as any;
    sanitized.dateUpdate = new Date();
    if (bounded) {
        await AppDataSource.getRepository(System).update(
            {
                id: bounded?.id
            },
            sanitized
        );
    } else {
        await AppDataSource.getRepository(System).save({
            userId: result.data.id,
            dateUpdate: new Date()
        });
    }
};

export function sanitizeObjectFrom<T extends Object>(input: Record<string, any>, oldVersion: T) {
    const result: { [x: string]: any } = {};
    const keys = Object.keys(oldVersion);
    keys.forEach(key => {
        if (key != "id" && input[key] != null) {
            result[key] = input[key];
        }
    });
    return result;
}
