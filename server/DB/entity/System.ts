import { EntitySchema } from "typeorm";
import { SystemEntity } from "./interfaces";

export const System = new EntitySchema<SystemEntity>({
	name: "system",
	tableName: "system",
	columns: {
		id: { type: Number, primary: true, generated: "increment" },
		userId: { type: String },
		dateUpdate: { type: Date, default: new Date() },
	},
	relations: {
		user: {
			type: "one-to-one",
			target: "user",
			joinColumn: true,
			inverseSide: "system",
		},
	},
});