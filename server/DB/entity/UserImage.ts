import { EntitySchema } from "typeorm";
import { USE, UserImageEntity } from "./interfaces";

export const UserImage = new EntitySchema<UserImageEntity>({
    name: "userimage",
    tableName: "userimage",
    columns: {
        id: { primary: true, type: String },
        userId: { type: String },
        mediaXXL: {
            type: "bytea", // Postgres ... or "longblob" for MySQL/MariaDB
            // B64
            // type: "longtext", 	// MySQL/MariaDB
            // type : "text"  		// For Postgres
            nullable: true
        },
        mediaL: { type: "bytea", nullable: true },
        mediaM: { type: "bytea", nullable: true },
        mediaS: { type: "bytea", nullable: true },
        mediaMimeType: { type: String, nullable: true },
        use: { type: "enum", enum: USE, nullable: true },
        size: { type: Number, nullable: true },
        url: { type: String, nullable: true },
        postDate: { type: Date, nullable: true },
        valid: { type: Boolean }
    }
});
