import { AppDataSource } from "~~/server/DB/data-source";
import type { SkillSectorCreationDTO } from "~~/server/DB/DTOs";
import type { SkillSectorEntity } from "~~/server/DB/entity/interfaces";
import { Sector } from "~~/server/DB/entity/Sector";
import { SkillSector } from "~~/server/DB/entity/SkillSector";
import { zCreateSkillSectors } from "~~/server/utils/validators/zods";

export default defineEventHandler(async (event) => {
	const result = await initializeDataSourceValid(event, zCreateSkillSectors);

	if (result.success) {
		const newVersion: SkillSectorCreationDTO = { ...result.data } as any;
		const { sectorId, professions, collection } = newVersion;

		const transaction = AppDataSource.manager.transaction(async (trx) => {
			const sector = (await trx.findBy(Sector, { id: sectorId }))[0];

			let allProfessions: number[] = [];
			collection.forEach((x) => {
				if (x.professions) {
					allProfessions = allProfessions.concat(...x.professions);
				}
			});

			if (allProfessions.length > 0) {
				const badProfessions = (
					await getProfessionsOfSkillSector(allProfessions!, sector.id)
				).filter((x) => {
					return x.sectorId != sector.id;
				});
				if (badProfessions.length > 0) {
					createInvalidDataError(
						event,
						`One or a few professions are out of the target sector [${
							sector.name
						},sector ${sector.id}]\n${badProfessions
							.map((x) => `[${x.id}:${x.name}] (sector ${x.sectorId})\n\r`)
							.join("-")}`
					);
				}
			}

			const skSectors: SkillSectorEntity[] = [];
			collection.forEach((skillSector) => {
				skSectors.push(
					trx.create(SkillSector, {
						professions: skillSector.professions
							? `:${skillSector.professions.join(":")}:`
							: professions
							? `:${professions.join(":")}:`
							: undefined,
						description: skillSector.description,
						sector,
						name: skillSector.name,
					})
				);
			});

			await trx.save(SkillSector, skSectors);
			return skSectors;
		});

		return conclude(transaction, (data: SkillSectorEntity[]) => {
			return JSON.stringify(
				data.map((x) => {
					const { name, sector, id, professions } = x;
					return { name, sector: sector.name, id, professions };
				})
			);
		});
	}
	return createInvalidDataError(event);
});
