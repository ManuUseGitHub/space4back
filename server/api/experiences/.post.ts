import { AppDataSource } from "~~/server/DB/data-source";

import { Experience } from "~~/server/DB/entity/Experience";
import type { ExperienceEntity } from "~~/server/DB/entity/interfaces";
import { zCreateExperience } from "~~/server/utils/validators/zods";
import { v4 as uuidV4 } from "uuid";
import type { StateModifyExperienceDTO } from "~~/server/DB/DTOs";
import { getUserExperiencesNextOrder } from "~~/server/utils/dsource";

export default defineEventHandler(async (event) => {
	const result = await initializeDataSourceValid(event, zCreateExperience);

	if (result.success) {
		const newVersion: ExperienceEntity = {
			...result.data,
			order:await getUserExperiencesNextOrder(result.data.userId),
			id: uuidV4(),
		} as any;

		textualizeLovAndCategories(result.data as any, newVersion);

		return await conclude(
			AppDataSource.getRepository(Experience).save(newVersion),

			(data: any) => {
				return `${JSON.stringify(data)}`;
			}
		);
	}
	return createInvalidDataError(event);
});
function textualizeLovAndCategories(
	data: StateModifyExperienceDTO,
	newVersion: ExperienceEntity
) {
	let allTheLovs: string[] = [];
	const allTheCats = data.categories
		.map((cat) => `${cat.order}:${cat.category}:${cat.style}-${cat.value}`)
		.join("\n");
	data.lov.forEach((category) => {
		category.items.forEach((item) => {
			allTheLovs.push(`${item.order}:${category.order}-${item.value}`);
		});
	});
	const lovs = allTheLovs.join("\n");
	newVersion.categories = allTheCats;
	newVersion.lov = lovs;
}
