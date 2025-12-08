import { AppDataSource } from "~~/server/DB/data-source";
import { Experience } from "~~/server/DB/entity/Experience";
import type { ExperienceEntity } from "~~/server/DB/entity/interfaces";

export default defineEventHandler(async (event) => {
	const result = await initializeDataSourceValid(event, zUpdateExperience);

	if (result.success) {
		const newVersion: ExperienceEntity = { ...result.data } as any;

		let allTheLovs: string[] = [];
		const allTheCats = result.data.categories
			.map((cat) => `${cat.order}:${cat.category}:${cat.style}-${cat.value}`)
			.join("\n");
		result.data.lov.forEach((category) => {
			category.items.forEach((item) => {
				allTheLovs.push(`${item.order}:${category.order}-${item.value}`);
			});
		});
		const lovs = allTheLovs.join("\n");
		newVersion.categories = allTheCats;
		newVersion.lov = lovs;

		return await conclude(
			AppDataSource.getRepository(Experience).update(
				{
					id: newVersion.id,
				},
				newVersion
			),

			(data: any) => {
				return `${JSON.stringify(data)}`;
			}
		);
	}
	return createInvalidDataError(event);
});
