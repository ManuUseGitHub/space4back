export const SELECT_EXPERIENCES_OF_USER = [
	"e.id",
	"e.order",
	"e.title",
	"e.role",
	"e.favorite",
	"e.yearStart",
	"e.monthStart",
	"e.yearEnd",
	"e.monthEnd",
	"e.client",
	"e.employer",
	"e.project",
	"e.description",
	"e.categories",
	"e.lov",
];

export const SELECT_USER_INFOS_FOR_EXPERIENCES = ["u.firstName", "u.lastName"];

export const SELECT_USER_WITH_PREFERENCES = [
	"u.id",
	"p.birthDateVisible",
	"p.addressVisible",
	"p.phoneVisible",
	"p.mailAddressVisible",
	"p.theme",
	"p.thPrefered",
	"p.thLight",
	"p.thDark",
	"u.firstName",
	"u.lastName",
	"u.gender",
	"u.title",
	"u.enterprise",
	"u.introduction",
	"u.professionalGoal",
	"u.mailAddress",
	"u.phone",
	"u.address",
	"u.birthDate",
];

export const SELECT_SESSION_USER_WITH_PREFERENCES = [
	"u.id",
	"p.theme",
	"p.thPrefered",
	"p.thLight",
	"p.thDark",
	"u.firstName",
	"u.lastName",
	"u.mailAddress"
];

export const SELECT_USER_WITH_CREDENTIALS = [
	"u.id",
	"u.mailAddress",
	"u.hashedPassword",
];

export const SELECT_USER_SECTOR_WITH_SECTOR = [
	"sk.id",
	"s.id",
	"sk.name",
	"sk.description",
	"sk.professions",
];

export const SELECT_PROFESSIONS = [
	"p.id",
	"p.name",
	"p.description",
	"p.sectorId",
];
