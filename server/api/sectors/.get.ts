import { AppDataSource } from "~~/server/DB/data-source.js";
import {
	getSectors,
} from "~~/server/utils/dsource";

export default defineEventHandler(async (event) => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const list: any[] = [];
	await Promise.all(
		(
			await getSectors(event)
		).map(async (x: any) => {
			return {
				...x,
			};
		})
	).then((values) => list.push(...values));

	return list;
});
