import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

export default defineConfig({
	test: {
		viteEnvironment: "test",
		include: ["test/**/*.test.ts"],
		setupFiles: ["/test/setup.ts"], // each time
		globalSetup: ["/test/globalSetup.ts"],
	},
	projects: [
		{
			test: {
				name: "unit",
				include: ["test/{e2e,unit}/*.{test,spec}.ts"],
				environment: "node",
			},
		},
		await defineVitestProject({
			test: {
				name: "nuxt",
				include: ["test/nuxt/*.{test,spec}.ts"],
				environment: "nuxt",
			},
		}),
	],
});
