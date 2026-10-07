import { ZodObject } from "zod";
import { AppDataSource } from "../DB/data-source.js";
import { H3Event, EventHandlerRequest } from "h3";
import { EntitySchema, SelectQueryBuilder } from "typeorm";
import { logIt } from "~~/server/utils/logger.js";

export const conclude = async <T>(
    promise: Promise<T>,
    successCB: (data: any) => string,
    onErrorCB: (error: any) => any = error => {
        console.error(error);
    }
) => {
    let message: any = "...";
    await promise
        .then(data => {
            message = JSON.stringify(successCB(data));
        })
        .catch(e => {
            message = onErrorCB(e);
        });
    return message;
};

export type QueryConditions = {
    andConditions?: string[];
    orderChain?: {
        sort: string;
        order: "ASC" | "DESC";
    }[];
};
export const addQueryConditions = (query: SelectQueryBuilder<any>, qConditions: QueryConditions) => {
    let resultQuery = query;
    if (qConditions.andConditions?.length) {
        qConditions.andConditions.forEach(condition => {
            resultQuery = resultQuery.andWhere(condition);
        });
    }
    if (qConditions.orderChain?.length) {
        qConditions.orderChain.forEach(({ sort, order }) => {
            resultQuery = resultQuery.addOrderBy(sort, order);
        });
    }
    return resultQuery;
};

export const initializeDataSource = async (event: H3Event<EventHandlerRequest>) => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    const body = await readBody(event);
    const log: any = {
        issued: body
    };
    //logIt(JSON.stringify(log, null, 2), "info");
    return body;
};

export const initializeDataSourceValid = async <T extends ZodObject>(event: H3Event<EventHandlerRequest>, z: T) => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const validation = await readValidatedBody(event, z.safeParse);

    const log: any = {
        issued: await readBody(event)
    };
    if (validation.error) {
        log.error = JSON.parse(validation.error.message);
    }

    logIt(JSON.stringify(log, null, 2), validation.error ? "error" : "info");

    return validation;
};

export const findBy = <T>(
    schema: EntitySchema<T>,
    search: Record<string, any>,
    selection: string[] = [],
    operations: QueryConditions = {}
) => {
    let query: SelectQueryBuilder<any> = AppDataSource.getRepository(schema).createQueryBuilder();
    if (selection.length) query = query.select(selection);
    query = query.where(search);
    query = addQueryConditions(query, operations);
    return query.getOne();
};

export const findBoundedToUser = <T>(entity: EntitySchema<T>, id: string) => {
    return AppDataSource.getRepository(entity).findOneBy({ userId: id });
};

export const asIds = (idsCollectionString: string) => {
    let p = /(\d+):/g;
    let ids: number[] = [];
    let result: any;
    while ((result = p.exec(idsCollectionString))) {
        ids.push(parseInt(result[1]));
    }
    return ids;
};
