import { fileURLToPath } from "node:url";
import { setup as setupE2E, fetch, $fetch } from "@nuxt/test-utils/e2e";
import { test, expect, it, describe } from "vitest";
import { AppDataSource } from "../server/DB/data-source";
import { join } from "path";
import { readFileSync } from "fs";

export default async function setup(project: TestProject) {
	await setupE2E({
		host: "http://localhost:8001",
	});
	await $fetch("/api/log", {
		method: "DELETE",
	});
}
