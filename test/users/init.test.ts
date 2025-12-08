import { test, expect, it, describe } from "vitest";
import { $fetch } from "@nuxt/test-utils/e2e";
import { getHashedPassword } from "~~/server/utils/common/hash";

const PASSWORD = getHashedPassword("P0kém0N9o");

const JAN_FIRST_93 = new Date(Date.parse("1993-01-01T00:00:00Z"));

const res: string = await $fetch("/api/users", {
	method: "POST",
	body: {
		lastName: "dfgdfgdfgjfd",
		firstName: "fghdfghdfg",
		mailAddress: "johnny.marina@hotmail.com",
		address: "Blv. de la constitution, 99b 4020 Liège, Belgium",
		phone: "+32495000000",
		theme: "system",
		birthDate: JAN_FIRST_93,
		hashedPassword: PASSWORD,
	},
});
const res2 = JSON.parse(await res);

it.each(["thPrefered", "thLight", "thDark"])(
	"POST /api/users works makes property %s of new user defined",
	(property: string) => {
		expect(res2.preferences[property]).toBeDefined();
	}
);

test("post a skill is possible", async () => {
	const res = await $fetch("/api/skills", {
		method: "POST",
		body: {
			name: "HTML",
			sectorId: 4,
			professions: [19, 20, 21],
			picto: "https/my photo",
			description: "Something",
		},
	});
});

test("cannot save existing user with same mail address", async () => {
	const newUser = {
		lastName: "john",
		firstName: "doe",
		mailAddress: "lanna.marina@hotmail.com",
		address: "...",
		phone: "+32495000000",
		theme: "system",
		birthDate: JAN_FIRST_93,
		hashedPassword: PASSWORD,
	};
	await expect(
		(async () => {
			await $fetch("/api/users", {
				method: "POST",
				body: newUser,
			});

			await $fetch("/api/users", {
				method: "POST",
				body: newUser,
			});
		})()
	).rejects.toThrowError(/An user with the same email already exists/);
});

test("a skill sector without profession extends to all professions of the sector", async () => {
	const res = await $fetch("/api/skillSector", {
		method: "POST",
		body: {
			sectorId: 4,
			collection: [
				{
					name: "IT tools",
					description: "Tools mostly used by developers",
				},
			],
		},
	});
	const res2 = res;
	console.log(res);
});

test("creating skillsectors is possible", async () => {
	const res = await $fetch("/api/skillSector", {
		method: "POST",
		body: {
			sectorId: 4,
			collection: [
				{
					name: "Programming language",
					professions: [85, 86, 87, 89, 90, 91, 92, 104, 105, 106],
					description: "What makes a true developer",
				},
			],
		},
	});
	console.log(res);
});
const SECTOR = 4;
it.each([1, 5, 9, 38, 41])(
	"Profession %s belongs not in section " + SECTOR,
	async (id: number) => {
		await expect(addSkillSector(id, SECTOR)).rejects.toThrowError(
			/.*412 Invalid data : One or a few professions are out of the target sector.*/gm
		);
	}
);

const addSkillSector = async (id: number, sector: number) => {
	await $fetch("/api/skillSector", {
		method: "POST",
		body: {
			sectorId: sector,
			collection: [
				{
					name: "Programming language",
					professions: [id],
					description: "What makes a true developer",
				},
			],
		},
	});
};
