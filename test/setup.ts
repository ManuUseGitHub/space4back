import { fileURLToPath } from "node:url";
import { setup, fetch, $fetch } from "@nuxt/test-utils/e2e";
import { test, expect, it, describe } from "vitest";
import { AppDataSource } from "../server/DB/data-source";
import { join } from "path";
import { readFileSync } from "fs";

await setup({
	host: "http://localhost:8001",
});
await $fetch("/api/log", {
	method: "DELETE",
});
if (!AppDataSource.isInitialized) {
	await AppDataSource.initialize();
}
await Promise.all(
	["schema-dump.SQL", "seedTables.SQL"].map(async (sql) => {
		const sqlPath = join(__dirname, sql);
		const data = readFileSync(sqlPath, "utf-8");
		await AppDataSource.query(data);
	})
);
