import { AppDataSource } from "~~/server/DB/data-source";
import type { SkillAssociationDTO } from "~~/server/DB/DTOs";
import type { SkillEntity } from "~~/server/DB/entity/interfaces";
import { Skill } from "~~/server/DB/entity/Skill";
import { UserSkill } from "~~/server/DB/entity/UserSkill";
import { zAttributeSkill } from "~~/server/utils/validators/zods";

export default defineEventHandler(async (event) => {
	const result = await initializeDataSourceValid(event, zAttributeSkill);

	if (result.success) {
		const newVersion: SkillAssociationDTO = { ...result.data } as any;
		const { name, userId, mastery } = newVersion;

		const transaction = AppDataSource.manager.transaction(async (trx) => {
			const skill: SkillEntity = trx.create(Skill, { name });
			await trx.save(Skill, skill);

			const userSkill = trx.create(UserSkill, {
				user: { id: userId },
				skill: { id: skill.id },
				mastery,
			});

			await trx.save(UserSkill, userSkill);
			return skill;
		});

		return conclude(
			transaction,
			(_: any) => "Creation of the skill + attribution successful"
		);
	}
	return createInvalidDataError(event);
});
