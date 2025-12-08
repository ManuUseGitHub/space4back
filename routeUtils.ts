import type { NuxtPage } from "nuxt/schema";
const SUFFIX = "-aliased";
export const removePagesMatchingPrefix = (
	prefixes: string[],
	pages: NuxtPage[] = []
) => {
	const toRemove: NuxtPage[] = [];

	for (const page of pages) {
		if (
			page.name &&
			prefixes.some(
				(prefix) =>
					!page.name!.endsWith(SUFFIX) && page.name!.startsWith(prefix)
			)
		) {
			toRemove.push(page);
		} else if (page.children?.length) {
			removePagesMatchingPrefix(prefixes, page.children);
		}
	}

	for (const page of toRemove) {
		pages.splice(pages.indexOf(page), 1);
	}
};

export const removeScriptFiles = (pages: NuxtPage[] = []) => {
	pages.forEach((page) => {
		if (/\.ts$/.test(page.file || "")) pages.splice(pages.indexOf(page), 1);
	});
};

export const aliasRoute = (
	pages: NuxtPage[],
	replacement: {
		path: string;
		target: string;
	},
	remove: boolean = true
) => {
	const route = pages.find((page) => page.path === replacement.path);

	if (route) {
		pages.push({
			...route,
			name: route.name + SUFFIX,
			path: replacement.target,
		});

		// remove all routes starting with
		if (remove) removePagesMatchingPrefix([route.name!], pages);
	}
};
