import { EntitySchema } from "typeorm";
import { UserEntity } from "./interfaces";

export const User = new EntitySchema<UserEntity>({
	name: "user",
	tableName: "user",
	columns: {
		id: { primary: true, type: String },
		uid: { type: String, unique: true, nullable: true },
		firstName: { type: String },
		lastName: { type: String },
		gender: { type: String, nullable: true },
		token: { type: String, nullable: true },
		role: { type: String, nullable: true },
		verified: { type: Boolean },
		sessionExpire: { type: Date, nullable: true },
		hashedPassword: { type: String, nullable: true },
		photo: {
			type: "bytea", // Postgres ... or "longblob" for MySQL/MariaDB
			// B64
			// type: "longtext", 	// MySQL/MariaDB
			// type : "text"  		// For Postgres
			nullable: true,
		},
		serviceImageUrl: { type: String, nullable: true },
		photoMimeType: { type: String, nullable: true },
		banner: {
			type: "bytea", // Postgres ... or "longblob" for MySQL/MariaDB
			// B64
			// type: "longtext", 	// MySQL/MariaDB
			// type : "text"  		// For Postgres
			nullable: true,
		},
		bannerMimeType: { type: String, nullable: true },
		title: { type: String, nullable: true },
		enterprise: { type: String, nullable: true },
		introduction: { type: String, nullable: true },
		professionalGoal: { type: String, nullable: true },
		//dateUpdate: { type: Date, nullable: true },
		mailAddress: { type: String, unique: true, nullable: false },
		phone: { type: String, nullable: true },
		address: { type: String, nullable: true },
		birthDate: { type: Date, nullable: true },
	},
	relations: {
		preferences: {
			type: "one-to-one",
			target: "preferences",
			inverseSide: "user",
			cascade: true,
		},
		system: {
			type: "one-to-one",
			target: "system",
			inverseSide: "user",
			cascade: true,
		},
		experiences: {
			type: "one-to-many",
			target: "experience",
			inverseSide: "user",
			cascade: true,
		},
		skills: {
			type: "one-to-many",
			target: "userskills",
			inverseSide: "user",
			cascade: true,
		},
	},
});
