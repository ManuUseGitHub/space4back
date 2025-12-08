import { EntitySchema } from "typeorm";
import { PreferencesEntity } from "./interfaces";

export const Preferences = new EntitySchema<PreferencesEntity>({
	name: "preferences",
	tableName: "preferences",
	columns: {
		id: { type: Number, primary: true, generated: "increment" },
		userId: { type: String },
		birthDateVisible: { type: Boolean, default: false },
		addressVisible: { type: Boolean, default: false },
		phoneVisible: { type: Boolean, default: false },
		mailAddressVisible: { type: Boolean, default: false },
		theme: { type: String, nullable: true },
		thPrefered: { type: String, nullable: true },
		thLight: { type: String, nullable: true },
		thDark: { type: String, nullable: true },
	},
	relations: {
		user: {
			type: "one-to-one",
			target: "user",
			joinColumn: true,
			inverseSide: "preferences",
		},
	},
});
