import { existsSync, mkdirSync } from "fs";

export const createUnexistingDir = (dir: string) => {
	if (!existsSync(dir)) {
		mkdirSync(dir);
	}
};
