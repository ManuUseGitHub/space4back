import type { ToastServiceMethods } from "primevue";
import type {
	CategorizedDTO,
	LovCollection,
	RegisterUserDTO,
} from "~~/server/DB/DTOs";

export type StateCreateUser = {
	user: RegisterUserDTO;
	isLoading: boolean;
	toast: any;
};

export type StateModifyTheme = {
	thLight: { code: string; name?: string };
	thDark: { code: string; name?: string };
	thPrefered: { code: string; name?: string };
};

export type StateModifyUser = {
	isLoading: boolean;
	toast: ToastServiceMethods;
	id: string;
	firstName: string;
	lastName: string;
	gender?: string;
	birthDate: Date;
	address: string;
	birthDateVisible?: boolean;
	addressVisible?: boolean;
	phoneVisible?: boolean;
	mailAddressVisible?: boolean;
	title?: string;
	enterprise?: string;
	introduction?: string;
	professionalGoal?: string;
	dateUpdate?: Date;
	phone?: string;
	mailAddress: string;
	theme: string;
	thLight: string;
	thDark: string;
	thPrefered: string;
};

export type StateModifyExperience = {
	isLoading: boolean;
	id: string;
	title: string;
	role: string;
	yearStart: number;
	monthStart: number;
	yearEnd: number;
	monthEnd: number;
	client: string;
	employer: string;
	project: string;
	description: string;
	categories: CategorizedDTO[];
	lov: LovCollection[];
	visible: boolean;
};

export type StateComposeExperience = {
	sameForClient: boolean;
	sameForRole: boolean;
	mode: "edit" | "create";
};

export type ConnexionSession = {
	idToken: string;
	uid: string;
	userId: string;
};

export type ValidationError = { path: string[]; message: string };

export type ValidationCB = (event: globalThis.ValidationError) => void;
export type FieldCB = (field: string) => void;
export type ErrorCB = (
	errors: {
		path: string[];
		message: string;
	}[]
) => void;
export type TokenProperties = {
	valid: boolean;
	invalidReason: string;
	hostname: string;
	androidPackageName: string;
	iosBundleId: any;
	action: string;
	createTime: Date;
};
