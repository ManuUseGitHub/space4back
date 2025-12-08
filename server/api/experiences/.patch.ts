import { AppDataSource } from "~~/server/DB/data-source";
import { Experience } from "~~/server/DB/entity/Experience";
import { zPatchExperiences } from "~~/server/utils/validators/zods";

export default defineEventHandler(async (event) => {
	const result = await initializeDataSourceValid(event, zPatchExperiences);

	if (result.success) {
		const { experiences: patches } = result.data as any;
		const repo = AppDataSource.getRepository(Experience);

		const transaction = repo.manager.transaction(async (trx) => {
			for (const patch of patches) {
				await trx
					.createQueryBuilder()
					.update(Experience)
					.set({
						favorite: patch.favorite,
						order: patch.order,
					})
					.where("id = :id", { id: patch.id })
					.execute();
			}
		});

		return conclude(transaction, (_: any) =>
			JSON.stringify("Bulk patch applied successfully")
		);
	}
	return createInvalidDataError(event);
});
