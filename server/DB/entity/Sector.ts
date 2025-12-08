import { EntitySchema } from "typeorm";
import { SectorEntity } from "./interfaces";

export const Sector = new EntitySchema<SectorEntity>({
	name: "sector",
	tableName: "sector",
	columns: {
		id: { primary: true, type: "int", generated: true },
		name: { type: String, unique: true },
		description: { type: String },
		comment: { type: String, nullable: true },
	},
	relations: {
		professions: {
			type: "one-to-many",
			target: "profession",
			inverseSide: "sector",
		},
		skillSectors: {
			type: "one-to-many",
			target: "skillsector",
			inverseSide: "sector",
			cascade: true,
		},
	},
});
