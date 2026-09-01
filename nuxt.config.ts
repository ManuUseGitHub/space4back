import tailwindcss from "@tailwindcss/vite";
import Aura from "@primeuix/themes/aura";
import { logIt } from "./server/utils/logger";

import { aliasRoute, removeScriptFiles } from "./server/utils/routeUtils";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
			env: process.env.APP_ENV || "development",
			firebaseConfig: {
				apiKey: process.env.FIRE_API_KEY,
				authDomain: process.env.FIRE_API_AUTH_DOMAIN,
				projectId: process.env.FIRE_API_PROJECT_ID,
				storageBucket: process.env.FIRE_API_STORAGE_BUCKET,
				messagingSenderId: process.env.FIRE_API_MESSAGING_SENDER_ID,
				appId: process.env.FIRE_API_APP_Id,
			},
		},
	},
	imports: {
		dirs: ["utils", "utils/**"],
	},
	components: [
		{ path: "~/components", pattern: "**/*.vue", pathPrefix: false },
	],

	plugins: ["~/plugins/firebase"],
	hooks: {
		"pages:extend"(pages) {
			//if (!isTest) {
			// find your existing dynamic route
			aliasRoute(pages, { path: "/", target: "/home" });
			aliasRoute(
				pages,
				{ path: "/user/profile/:id()", target: "/u/:id?" },
				false
			);
			aliasRoute(pages, { path: "/user/edit/:id()", target: "/u-e/:id?" });
			aliasRoute(pages, {
				path: "/user/experience/:id()",
				target: "/uexp/:id?",
			});

			// remove script files from routing
			removeScriptFiles(pages);
			//}

			logIt(
				`ENVIRONMENT : ${process.env.APP_ENV}`,
				"info",
				process.env.APP_ENV
			);
			logIt(
				JSON.stringify(
					{ routes: pages.map((x: any) => x.path).sort() },
					null,
					2
				),
				"info",
				process.env.APP_ENV
			);
		},
	},
	css: [
		"~/assets/scss/style.scss",
		"~/assets/css/main.css",
		"primeicons/primeicons.css",
	], //, "@picocss/pico"],
	compatibilityDate: "2025-07-15",
	modules: ["@primevue/nuxt-module", "@nuxt/ui", "@nuxt/test-utils/module"],
	devtools: {
		vscode: {},
		enabled: false,
		componentInspector: true,
		timeline: { enabled: false },
	},
	primevue: {
		options: {
			theme: {
				preset: Aura,
			},
		},
	},

	vite: {
		plugins: [tailwindcss()],
		css: {
			preprocessorOptions: {
				scss: {
					quietDeps: true,
				},
			},
		},
	},
});
