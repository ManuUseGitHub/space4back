import { EntitySchema } from "typeorm";
import { SkillSectorEntity } from "./interfaces";

export const SkillSector = new EntitySchema<SkillSectorEntity>({
	name: "skillsector",
	tableName: "skillsector",
	columns: {
		id: { type: Number, primary: true, generated: true },
		name: { type: String },
		description: { type: String, nullable: true },
		professions: { type: String, nullable: true },
	},
	relations: {
		skills: {
			type: "one-to-many",
			target: "skill",
			inverseSide: "skillsector",
			cascade: true,
		},
		sector: {
			type: "many-to-one",
			target: "sector",
			joinColumn: true,
			onDelete: "CASCADE",
		},
	},
});
