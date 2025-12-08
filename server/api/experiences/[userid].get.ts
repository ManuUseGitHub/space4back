import { AppDataSource } from "~~/server/DB/data-source";
import { getUserExperiences } from "~~/server/utils/dsource";

export default defineEventHandler(async (event) => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    return getUserExperiences(event);
});

