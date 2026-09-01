import { z, ZodString } from "zod";
import { MAIL_ADDRESS_REGEX } from "../../regexes";

export const zRegisterUser = z.object({
	lastName: z.string().nonempty("The field is required"),
	firstName: z.string().nonempty("The field is required"),
	mailAddress: z
		.string()
		.nonempty("The field is required")
		.regex(MAIL_ADDRESS_REGEX, {
			error: (_) => `The format is not valiid for an email address`,
		}),
	address: z.string(),
	phone: z.string().nullable(),
	birthDate: z.string().nonempty("The field is required"),
	hashedPassword: z.string().min(1, "The field is required"),
});
export const zUpdateUser = z.object({
	id: z.string(),
	lastName: z.string().min(2),
	firstName: z.string().min(2),
	gender: z.string().nullable(),
	mailAddress: z.string().regex(MAIL_ADDRESS_REGEX),
	address: z.string().min(2),
	phone: z.string().nullable(),
	introduction: z.string().nullable(),
	title: z.string().nullable(),
	enterprise: z.string().nullable(),
	professionalGoal: z.string().nullable(),
	dateUpdate: z.string().nullish(),

	birthDateVisible: z.boolean(),
	addressVisible: z.boolean(),
	phoneVisible: z.boolean(),
	mailAddressVisible: z.boolean(),

	theme: z.string(),
	thDark: z.string(),
	thLight: z.string(),
	thPrefered: z.string(),
	birthDate: z.string(),
});
const zCategorized = z.object({
	order: z.number(),
	category: z.number().nullish(),
	style: z.string().nullish(),
	value: z.string(),
});
const zLov = z.object({
	order: z.number(),
	category: z.string(),
	items: z.array(zCategorized),
});

export const zUpdateExperience = z.object({
	id: z.string(),
	order: z.number(),
	title: z.string(),
	role: z.string(),
	yearStart: z.number().min(0).max(new Date().getFullYear()),
	monthStart: z.number().max(12),
	yearEnd: z.number().min(0).max(new Date().getFullYear()),
	monthEnd: z.number().max(12),
	client: z.string(),
	employer: z.string(),
	project: z.string(),
	description: z.string(),
	categories: z.array(zCategorized),
	lov: z.array(zLov),
});

export const zUpdateRoles = z.object({
	roles: z.array(z.string())
});

export const zPatchExperience = z.object({
	id: z.string(),
	order: z.number(),
	favorite: z.boolean(),
});

export const zPatchExperiences = z.object({
	experiences: z.array(zPatchExperience),
});

export const zCreateExperience = z.object({
	userId: z.string(),
	title: z.string(),
	role: z.string(),
	yearStart: z.number().min(0).max(new Date().getFullYear()),
	monthStart: z.number().max(12),
	yearEnd: z.number().min(0).max(new Date().getFullYear()),
	monthEnd: z.number().max(12),
	client: z.string(),
	employer: z.string(),
	project: z.string(),
	description: z.string(),
	categories: z.array(zCategorized),
	lov: z.array(zLov),
});

export const zById = z.object({
	id: z.number(),
});

export const zAttributeSkill = z.object({
	userId: z.string(),
	name: z.string(),
	mastery: z.number(),
});

export const zCreateSkill = z.object({
	name: z.string(),
	sectorId: z.number(),
	professions: z.array(z.number()),
	picto: z.string(),
	description: z.string(),
});
export const zSkillSectors = z.object({
	sectorId: z.number().nullish(),
	professions: z.array(z.number()).nullish(),
	description: z.string(),
	name: z.string(),
});
export const zCreateSkillSectors = z.object({
	sectorId: z.number().nullish(),
	professions: z.array(z.number()).nullish(),
	collection: z.array(zSkillSectors),
});

export const zSyncAccount = z.object({
	uid: z.string(),
	displayName: z.string(),
	email: z.email(),
	phoneNumber: z.string().nullish(),
	photoURL: z.string().nullish(),
});

export const zLoginSocialAccount = z.object({
	idToken: z.string(),
});

export const zLoginAccount = z.object({
	email: z.string(),
	password: z.string(),
});
