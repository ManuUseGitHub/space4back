import { Buffer } from "buffer";
import IconsBoyIcon from "~/components/boy.vue";
export const themes = [
	{ icon: icons.pStar, value: "prefered" },
	{ icon: icons.pSun, value: "light" },
	{ icon: icons.pMoon, value: "dark" },
	{ icon: icons.pWrench, value: "system" },
];
export const genders = [
	{
		icon: icons.pMars,
		value: "m",
		label: "Male",
	},
	{
		icon: icons.pVenus,
		value: "f",
		label: "Female",
	},
	{
		icon: icons.pTimes,
		value: "x",
		label: "Special",
	},
];
export const colorThemes = [
	{ name: "classic light", code: "LGT_classic" },
	{ name: "classic dark", code: "DRK_classic" },
	{ name: "solarized light", code: "LGT_solarized" },
	{ name: "solarized dark", code: "DRK_solarized" },
	{ name: "mugiwara", code: "mugiwara" },
	{ name: "blue print", code: "blueprint" },
];

export const fields: {
	[field: string]: {
		label: string;
		hint?: string;
		icon: string;
		emptyError?: string;
	};
} = {
	[FIELD_NAMES.PASSWORD]: { label: "password", icon: icons.pAsterisk },
	[FIELD_NAMES.HASHED_PASSWORD]: { label: "password", icon: icons.pAsterisk },
	[FIELD_NAMES.FIRST_NAME]: { label: "first name", icon: icons.pUser },
	[FIELD_NAMES.LAST_NAME]: { label: "last name", icon: icons.pUser },
	[FIELD_NAMES.BIRTH_DATE]: {
		label: "birth date",
		hint: "(dd/mm/yyyy)",
		icon: icons.pCalendar,
	},
	[FIELD_NAMES.PHONE]: {
		label: "phone number",
		hint: "i.e. 0423566",
		icon: icons.pPhone,
	},
	[FIELD_NAMES.MAIL_ADDRESS]: { label: "mail address", icon: icons.pEnvelope },
	[FIELD_NAMES.GENDER]: { label: "gender", icon: icons.pUser },
	[FIELD_NAMES.TITLE]: {
		label: "pro title",
		icon: icons.pUser,
		hint: "as a worker",
	},
	[FIELD_NAMES.ENTERPRISE]: { label: "enterprise name", icon: icons.pUser },
	[FIELD_NAMES.INTRODUCTION]: { label: "introduction", icon: icons.pUser },
	[FIELD_NAMES.PROFESSIONAL_GOAL]: {
		label: "professional goal",
		icon: icons.pUser,
	},
	[FIELD_NAMES.REPEAT_PASS]: {
		label: "repeat password",
		icon: icons.pAsterisk,
	},
	[FIELD_NAMES.RE_CAPTCHA]: {
		label: "captcha",
		icon: icons.pAndroid,
		emptyError: "Your humanity is required",
	},
	// experiience
	[FIELD_NAMES.EMPLOYER]: {
		label: "employer",
		icon: icons.pBuilding,
	},
	[FIELD_NAMES.CLIENT]: {
		label: "client",
		icon: icons.pShop,
	},
	[FIELD_NAMES.ROLE]: {
		label: "role",
		icon: icons.pTag,
		hint: "i.e. sales lead / investor",
	},
	[FIELD_NAMES.PROJECT]: {
		label: "project name",
		icon: icons.pBriefcase,
		hint: "i.e. scrum master half time",
	},
	[FIELD_NAMES.PROJECT_DESCRIPTION]: {
		label: "project description",
		icon: icons.pBriefcase,
		hint: "lenghtly description",
	},
	[FIELD_NAMES.MONTH_START]: {
		label: "month start",
		icon: icons.pCalendar
	},
	[FIELD_NAMES.MONTH_END]: {
		label: "month end",
		icon: icons.pCalendar
	},
	[FIELD_NAMES.CATEGORIES] : {
		label: "category",
		icon: icons.pStar
	}
};

export const getLabel = (field: string) => {
	return (
		fields[field] || {
			label: "unknown : " + field,
			hint: "...",
			icon: icons.pAsterisk,
		}
	);
};

export const getLabelSimple = (field: string) => {
	return getLabel(field);
};

export const getLabelHinted = (field: string) => {
	const { label, hint } = getLabel(field);
	return `${label}${hint ? ", " + hint : ""}`;
};

export const getFieldDisplayData = (props: { [x: string]: any }, field: string) => {
  const {label,hint,icon} = getLabel(field);
  return {
		label: props.label || `${label}${hint ? ", " + hint : ""}`,
		icon: props.icon || icon,
	};
};

export const getPickedTheme = (code: string) =>
	(colorThemes.find((th) => th.code == code) || { name: "" }).name;

export const excludedDarkThemes = colorThemes.filter(
	(c) => !/^DRK_.*/.test(c.code),
);
export const excludedLightThemes = colorThemes.filter(
	(c) => !/^LGT_.*/.test(c.code),
);
export const imageFromBuffer = (image: any) => {
	return Buffer.from(image).toString("base64");
};

export const getGender = (gender: string | undefined) => {
	if (!gender) {
		return "";
	}
	return {
		m: `${icons.pMars} text-blue-400!`,
		f: `${icons.pVenus} text-pink-400!`,
		x: `${icons.pTimes} text-purple-400!`,
	}[gender];
};

export const getRomanCount = (num: number) => {
  return ["Z", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "IX"][num] || "-";
}
