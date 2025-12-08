import { ZodObject } from "zod";
import { AppDataSource } from "../DB/data-source.js";
import { H3Event, EventHandlerRequest } from "h3";
import { EntitySchema, SelectQueryBuilder } from "typeorm";
import { logIt } from "~~/server/utils/logger.js";

export const conclude = async <T>(
	promise: Promise<T>,
	successCB: (data: any) => string,
	onErrorCB: (error: any) => any = (error) => {
		console.error(error);
	}
) => {
	let message = "...";
	await promise
		.then((data) => {
			message = JSON.stringify(successCB(data));
		})
		.catch((e) => {
			message = onErrorCB(e);
		});
	return message;
};

export const initializeDataSource = async (
	event: H3Event<EventHandlerRequest>
) => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}
	const log: any = {
		issued: await readBody(event),
	};
	logIt(JSON.stringify(log, null, 2), "info");
	return await readBody(event);
};

export const initializeDataSourceValid = async <T extends ZodObject>(
	event: H3Event<EventHandlerRequest>,
	z: T
) => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const validation = await readValidatedBody(event, z.safeParse);

	const log: any = {
		issued: await readBody(event),
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
	selection: string[] = []
) => {
	let query: SelectQueryBuilder<any> =
		AppDataSource.getRepository(schema).createQueryBuilder();
	if (selection.length) query = query.select(selection);
	return query.where(search).getOne();
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
