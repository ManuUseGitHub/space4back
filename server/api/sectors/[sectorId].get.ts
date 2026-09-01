import { AppDataSource } from "~~/server/DB/data-source.js";
import { getProfessionsOfSkillSector, getSkillSectorsForSector } from "~~/server/utils/dsource";
import { asIds } from "~~/server/utils/request.helper";

export default defineEventHandler(async event => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const sector = (await getSkillSectorsForSector(event))[0];
    sector.professions = await getProfessionsOfSkillSector(
        asIds(sector.professions),
        parseInt(event.context.params!.sectorId)
    );
    return sector;
});
