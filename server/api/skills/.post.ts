import { AppDataSource } from "~~/server/DB/data-source";
import type { SkillAssociationDTO, SkillCreationDTO } from "~~/server/DB/DTOs";
import type {
	SkillEntity,
	SkillSectorEntity,
} from "~~/server/DB/entity/interfaces";
import { Sector } from "~~/server/DB/entity/Sector";
import { Skill } from "~~/server/DB/entity/Skill";
import { SkillSector } from "~~/server/DB/entity/SkillSector";
import { zCreateSkill } from "~~/server/utils/validators/zods";

export default defineEventHandler(async (event) => {
	const result = await initializeDataSourceValid(event, zCreateSkill);

	if (result.success) {
		const newVersion: SkillCreationDTO = { ...result.data } as any;
		const { name, sectorId, professions, picto, description } = newVersion;
		const verified = false;

		const transaction = AppDataSource.manager.transaction(async (trx) => {
			const sector = (await trx.findBy(Sector, { id: sectorId }))[0];

			const skillSector: SkillSectorEntity = trx.create(SkillSector, {
				professions: `:${professions.join(":")}:`,
				lov: "",
				description: "",
				sector,
				name: "",
			});
			await trx.save(SkillSector, skillSector);

			const skill: SkillEntity = trx.create(Skill, {
				name,
				picto,
				verified,
				description,
				skillSector,
			});

			await trx.save(Skill, skill);
			return skill;
		});

		return conclude(
			transaction,
			(_: any) => "Creation of the skill + attribution successful"
		);
	}
	return createInvalidDataError(event);
});
