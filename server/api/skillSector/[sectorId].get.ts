import { AppDataSource } from "~~/server/DB/data-source.js";
import {
	getProfessionsOfSkillSector,
	getSkillSectorsForSector,
} from "~~/server/utils/dsource";
import { asIds } from "~~/server/utils/request.helper";

export default defineEventHandler(async (event) => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const list: any[] = [];
	await Promise.all(
		(
			await getSkillSectorsForSector(event)
		).map(async (x: any) => {
			return {
				...x,
				lots: await getProfessionsOfSkillSector(
					asIds(x.professions),
					parseInt(event.context.params!.sectorId)
				),
			};
		})
	).then((values) => list.push(...values));

	return list;
});
