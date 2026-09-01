// server.js - Starter file for cPanel Node.js App
import { pathToFileURL } from "node:url";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nitroEntry = pathToFileURL(
	join(__dirname, "output/server/index.mjs")
).href;

import(nitroEntry).catch((err) => {
	console.error("❌ Failed to start Nitro server");
	console.error(err);
	process.exit(1);
});
