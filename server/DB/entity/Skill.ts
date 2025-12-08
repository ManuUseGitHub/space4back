import { EntitySchema } from "typeorm";
import { SkillEntity } from "./interfaces";

export const Skill = new EntitySchema<SkillEntity>({
	name: "skill",
	tableName: "skills",
	columns: {
		id: {
			type: Number,
			primary: true,
			generated: true,
		},
		name: {
			type: String,
			unique: true,
		},
		picto: { type: String, nullable: true },
		verified: { type: Boolean, default: false },
		description: { type: String, nullable: true },
	},
	relations: {
		users: {
			type: "one-to-many",
			target: "userskills",
			inverseSide: "skill",
			cascade: true,
		},
		skillSector: {
			type: "many-to-one",
			target: "skillsector",
			joinColumn: true,
			onDelete: "CASCADE",
		},
	},
});
