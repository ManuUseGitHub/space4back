import connexion from "./connexionData.json";
import { test, expect, it, describe } from "vitest";
import { $fetch } from "@nuxt/test-utils/e2e";
import { logIt } from "../utils";
import { getHashedPassword } from "~~/server/utils/common/hash";

const PASSWORD = getHashedPassword("P0kém0N9o!");

test("syncing to not existing profile creates a new User", async () => {
	const { providerData } = connexion;
	const res: string = await $fetch("/api/connexion/sync", {
		method: "POST",
		body: {
			...providerData[0],
			uid: connexion.uid,
			emailVerified: connexion.emailVerified,
		},
	});
});

test("syncing to an existing email address Updates the user", async () => {
	const MAIL = "pete.marina@hotmail.com";

	const saved: any = await $fetch("/api/users", {
		method: "POST",
		body: {
			lastName: "dfgdfgdfgjfd",
			firstName: "fghdfghdfg",
			mailAddress: MAIL,
			address: "Blv. de la constitution, 99b 4020 Liège, Belgium",
			phone: "+32495000000",
			theme: "system",
			birthDate: new Date(Date.parse("1993-01-01T00:00:00Z")),
			hashedPassword: PASSWORD,
		},
	});

	const { providerData: list } = connexion;
	const providerData = list[0];
	const res: string = await $fetch("/api/connexion/sync", {
		method: "POST",
		body: {
			...providerData,
			email: MAIL,
			uid: `1234${connexion.uid}`,
			emailVerified: connexion.emailVerified,
		},
	});

	const id = JSON.parse(saved).id;
	const updated = await $fetch("/api/user/" + id);
	const updatedPhoto: any = await $fetch("/api/photo/" + id);
	expect(updatedPhoto.photoMimeType).toBe("url");
});

test("syncing existing email address removes the hashed password since it is not needed", async () => {
	const MAIL = "perry.patipuss@hotmail.com";

	const saved: any = await $fetch("/api/users", {
		method: "POST",
		body: {
			lastName: "dfgdfgdfgjfd",
			firstName: "fghdfghdfg",
			mailAddress: MAIL,
			address: "Blv. de la constitution, 99b 4020 Liège, Belgium",
			phone: "+32495000000",
			theme: "system",
			birthDate: new Date(Date.parse("1993-01-01T00:00:00Z")),
			hashedPassword: PASSWORD,
		},
	});

	const { providerData: list } = connexion;
	const providerData = list[0];
	await $fetch("/api/connexion/sync", {
		method: "POST",
		body: {
			...providerData,
			email: MAIL,
			uid: `12345${connexion.uid}`,
			emailVerified: connexion.emailVerified,
		},
	});

	const id = JSON.parse(saved).id;
	const updated: any = await $fetch("/api/search/users", {
		method: "post",
		body: { mailAddress: MAIL },
	});
	await $fetch("/api/photo/" + id);
	expect(updated[0].hashedPassword).toBeNull();
});

test("you can get an account by mail", async () => {
	const MAIL = "peter.pan@hotmail.com";

	await $fetch("/api/users", {
		method: "POST",
		body: {
			lastName: "Peter",
			firstName: "Pan",
			mailAddress: MAIL,
			address: "Blv. de la constitution, 99b 4020 Liège, Belgium",
			phone: "+32495678910",
			theme: "system",
			birthDate: new Date(Date.parse("1993-01-01T00:00:00Z")),
			hashedPassword: PASSWORD,
		},
	});

	logIt(
		JSON.stringify(
			await $fetch("/api/search/users", {
				method: "POST",
				body: { mailAddress: MAIL },
			}),
			null,
			2
		),
		"info"
	);
});
