import { SectorEntity } from "../entity/interfaces";

export type RegisterUserDTO = {
	firstName: string;
	lastName: string;
	birthDate: Date;
	mailAddress: string;
	address: string;
	phone?: string;
};

export type UserDTO = {
	id: string;
	firstName: string;
	lastName: string;
	birthDate: Date;
	address: string;
	phone?: string;
	mailAddress: string;
	age: number;
};

export interface LoggedInUser {
	id: string;
	uid?: string;
	firstName: string;
	lastName?: string;
	mailAddress: string;
	phone?: string;
	role: string;
	sessionExpire?: Date;
	userId: number;
	theme: string;
	thLight: string;
	thDark: string;
	thPrefered: string;
}

export type UserPreferencesDTO = {} & WriteUserPreferencesDTO &
	UserProfilePictureDTO &
	UserProfileBannerPictureDTO;

export type UserProfilePictureDTO = {
	photo?: any;
	photoMimeType?: string;
	serviceImageUrl?: string;
};

export type UserProfileBannerPictureDTO = {
	banner?: any;
	bannerMimeType?: string;
};

export type WriteUserPreferencesDTO = {
	id: string;
	firstName: string;
	lastName: string;
	birthDate: Date;
	address: string;

	birthDateVisible: boolean;
	addressVisible: boolean;
	phoneVisible: boolean;
	mailAddressVisible: boolean;

	title?: string;
	enterprise?: string;
	introduction?: string;
	professionalGoal?: string;
	dateUpdate?: Date;

	phone?: string;
	mailAddress: string;
	theme: string;
	gender?: string;
	thLight: string;
	thDark: string;
	thPrefered: string;
	preferencesChanged: boolean;
	userChanged: boolean;
};

export type DeletedUserDTO = {
	firstName: string;
	lastName: string;
};

export type CategorizedDTO = {
	order: number;
	category?: number;
	style?: string;
	value: string;
};

export type ExperienceDTO = {
	id: string;
	favorite: boolean;
	order: number;
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
};

export  type SectorDTO = {
	id: number;
	name: string;
	description: string;
	comment?: string;
	professions : ProfessionDTO[]
}

export type SectoredProfessionsDTO = {
	sector: SectorDTO,
	professions : ProfessionDTO[]
}

export type ProfessionDTO = {
	id : number,
	name : string,
	description: string
}

export type ExperiencesToPatch = {
	id: string;
	favorite: boolean;
	order: number;
};

export type UserWithExperiencesDTO = {
	userId: string;
	firstName: string;
	lastName: string;
	experiences: ExperienceDTO[];
};

export type LovCollection = {
	order: number;
	category: string;
	style?: string | undefined;
	items: CategorizedDTO[];
};

export type StateModifyExperienceDTO = {
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

export type SkillAssociationDTO = {
	userId: string;
	mastery: number;
	name: string;
};

export type SkillCreationDTO = {
	name: string;
	sectorId: number;
	professions: number[];
	picto: string;
	description: string;
};

export type SkillSectorCreationDTO = {
	sectorId?: number;
	professions?: number[];
	collection: {
		sectorId?: number;
		professions: number[];
		description: string;
		name: string;
	}[];
};

export type SyncAccount = {
	uid: string;
	displayName: string;
	email: string;
	phoneNumber?: string;
	photoURL: string;
};
