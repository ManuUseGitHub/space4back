import bcrypt from "bcryptjs";

const sHash = (hash: number) => {
	const p = /[\d-]{0,4}/g;
	let m;
	const hashed: string[] = [];
	while ((m = p.exec(`${hash}`)) && m[0]) {
		hashed.push(m[0]);
	}
	return hashed.join("-");
};

export const getHashedPassword = (password: string) => {
	return bcrypt.hashSync(password, 15);
};

export const registerPatch = <T extends { id: any }>(
	candidate: { data: T; hash: number },
	patchList: T[],
	hashList: string[]
) => {
	const { hash, data } = candidate;
	const index = patchList.findIndex((x) => x.id == data.id);

	if (index == -1) {
		patchList.push(data);
		hashList.push(sHash(hash));
	} else {
		if (hashList[index] != sHash(hash)) {
			patchList[index] = JSON.parse(JSON.stringify(data));
		} else {
			hashList.splice(index, 1);
			patchList.splice(index, 1);
		}
	}
};

export const generateHash = (obj: any) => {
	let hash = 0;
	for (const char of JSON.stringify(obj)) {
		hash = (hash << 5) - hash + char.charCodeAt(0);
		hash |= 0; // Constrain to 32bit integer
	}
	return hash;
};
