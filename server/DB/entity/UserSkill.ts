import { EntitySchema } from "typeorm";
import { UserSkillEntity } from "./interfaces";

export const UserSkill = new EntitySchema<UserSkillEntity>({
	name: "userskills",
	tableName: "userskills",
	columns: {
		id: {
			type: String,
			primary: true,
		},
		mastery: {
			type: Number,
			default: 0,
		},
	},
	relations: {
		user: {
			type: "many-to-one",
			target: "user",
			joinColumn: true,
			onDelete: "CASCADE",
		},
		skill: {
			type: "many-to-one",
			target: "skill",
			joinColumn: true,
			onDelete: "CASCADE",
		},
	},
	indices: [
		{
			columns: ["user", "skill"],
			unique: true,
		},
	],
});
