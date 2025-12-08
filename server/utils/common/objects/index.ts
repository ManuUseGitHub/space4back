export const colorThemes: { name: string; code: string }[] = [
	{ name: "classic light", code: "LGT_classic" },
	{ name: "classic dark", code: "DRK_classic" },
	{ name: "solarized light", code: "LGT_solarized" },
	{ name: "solarized dark", code: "DRK_solarized" },
	{ name: "mugiwara", code: "mugiwara" },
	{ name: "blue print", code: "blueprint" },
];

export function jsonStringifyRecursive(obj: any) {
	const cache = new Set();
	return JSON.stringify(
		obj,
		(key, value) => {
			if (typeof value === "object" && value !== null) {
				if (cache.has(value)) {
					// Circular reference found, discard key
					return;
				}
				// Store value in our collection
				cache.add(value);
			}
			return value;
		},
		2
	);
}