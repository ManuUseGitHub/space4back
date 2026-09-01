import { AppDataSource } from "~~/server/DB/data-source";
import { getProfessionsForSector } from "~~/server/utils/dsource";

export default defineEventHandler(async event => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const list: any[] = [];
    await Promise.all(await getProfessionsForSector(event)).then(values => list.push(...values));

    return list;
});
