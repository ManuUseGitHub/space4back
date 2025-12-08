export interface UserEntity {
	id: string;
	uid?: string;
	photo?: Buffer<ArrayBufferLike>;
	serviceImageUrl?: string;
	photoMimeType?: string;
	banner?: Buffer<ArrayBufferLike>;
	bannerMimeType?: string;
	firstName: string;
	lastName?: string;
	gender?: string;
	title?: string;
	enterprise?: string;
	introduction?: string;
	professionalGoal: string;
	mailAddress: string;
	hashedPassword?: string | null;
	address: string;
	phone?: string;
	birthDate?: Date;
	token?: string;
	role: string;
	verified: boolean;
	sessionExpire?: Date;
	userId: number;
	preferences: PreferencesEntity; // the relation property
	system: SystemEntity; // the relation property
	experiences: ExperienceEntity[];
	skills: SkillEntity[];
}
export interface PreferencesEntity {
	id?: number;
	birthDateVisible: boolean;

	// about me
	photo?: string;
	banner?: string;
	title?: string;
	enterprise?: string;

	introduction?: string;
	professionalGoal?: string;
	//dateUpdate: Date;

	// links : {name:String,url:String,logo:String}[]

	// languages : {
	// languageSpoken: string;
	// languageSpokenLevel: string;
	// languageSpokenPlace: string;
	// languageSpokenEvolution: string;
	// }[]

	// graduations : {
	// graduationPlace : String
	// graduationTitle : String
	// graduationDate : Date
	// }[]

	addressVisible: boolean;
	phoneVisible: boolean;
	mailAddressVisible: boolean;
	theme: string;
	thPrefered?: string;
	thLight?: string;
	thDark?: string;
	userId: string;
	user?: UserEntity;
}

export interface SystemEntity {
	id?: number;
	dateUpdate: Date;
	userId: string;
	user?: UserEntity;
}

export interface ExperienceEntity {
	id: string;
	order: number;
	userId: string;
	favorite?: boolean;
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
	categories: string;
	lov: string;
	user?: UserEntity;
}

export interface UserSkillEntity {
	id: string;
	mastery: number;
	user?: UserEntity;
	skill?: SkillEntity;
}

export interface SkillEntity {
	id: number;
	name: string;
	picto: string;
	verified: boolean;
	users: UserEntity[];
	description?: string;
	skillSector: SkillSectorEntity;
}

export interface ProfessionSkillEntity {
	id: string;
	slugName: string;
	illustration: string;
	profession?: ProfessionEntity;
	skill?: SkillEntity;
}

export interface SkillSectorEntity {
	id: number;
	name: string;
	description: string;
	professions: string;
	sector: SectorEntity;
	skills?: SkillEntity[];
}

export interface SectorEntity {
	id: number;
	name: string;
	description: string;
	comment?: string;
	professions?: ProfessionEntity[];
	skillSectors?: SkillSectorEntity[];
}

export interface ProfessionEntity {
	id: string;
	name: string;
	description?: string;
	sectorId: number;
	sector?: SectorEntity;
	skills?: SkillEntity[];
}
