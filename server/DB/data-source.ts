//import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Preferences } from "./entity/Preferences";
import { System } from "./entity/System";
import { Experience } from "./entity/Experience";
import { Skill } from "./entity/Skill";
import { UserSkill } from "./entity/UserSkill";
import { Profession } from "./entity/Profession";
import { Sector } from "./entity/Sector";
import { SkillSector } from "./entity/SkillSector";

const database = process.env.DB_DATABASE || "postgres";
const password = process.env.DB_PASSWORD || "postgres";
const username = process.env.DB_USER || "postgres";
const host = process.env.DB_HOST || "localhost";
const port = Number.parseInt(`${process.env.DB_PORT || 5432}`);

export const AppDataSource = new DataSource({
	type: "postgres",
	host,
	port,
	username,
	password,
	database,
	synchronize: !isProd,
	logging: false,
	entities: [
		User,
		Preferences,
		System,
		Experience,
		Skill,
		UserSkill,
		Profession,
		SkillSector,
		Sector,
	],
	migrations: [],
	subscribers: [],
});
