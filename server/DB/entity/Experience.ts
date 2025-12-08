import { EntitySchema } from "typeorm";
import { ExperienceEntity } from "./interfaces";

export const Experience = new EntitySchema<ExperienceEntity>({
	name: "experience",
	tableName: "experience",
	columns: {
		id: { primary: true, type: String },
		order: { type: Number },
		userId: { type: String },
		title: { type: String },
		role: { type: String },
		favorite: { type: Boolean, default: false },
		yearStart: { type: Number },
		monthStart: { type: Number },
		yearEnd: { type: Number },
		monthEnd: { type: Number },
		client: { type: String },
		employer: { type: String },
		project: { type: String },
		description: { type: String },
		categories: { type: String },
		lov: { type: String },
	},
	relations: {
		user: {
			type: "many-to-one",
			target: "user",
			joinColumn: {
				name: "userId",
			},
			inverseSide: "experience",
		},
	},
});
