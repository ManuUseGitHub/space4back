import { EntitySchema } from "typeorm";
import { ProfessionEntity } from "./interfaces";

export const Profession = new EntitySchema<ProfessionEntity>({
	name: "profession",
	tableName: "profession",
	columns: {
		id: { primary: true, type: "int", generated: true },
		name: { type: String },
		description: { type: String, nullable: true },
		sectorId: { type: "int" },
	},
	relations: {
		sector: {
			type: "many-to-one",
			target: "sector",
			joinColumn: { name: "sectorId" },
			inverseSide: "professions",
			onDelete: "CASCADE",
		},
		skills: {
			type: "one-to-many",
			target: "userskills",
			inverseSide: "profession",
			cascade: true,
		},
	},
});
