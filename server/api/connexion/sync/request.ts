import { AppDataSource } from "~~/server/DB/data-source";
import { User } from "~~/server/DB/entity/User";

import type { SyncAccount } from "~~/server/DB/DTOs";
import { v4 as uuidv4 } from "uuid";
import { UserEntity } from "~~/server/DB/entity/interfaces";

export const syncUser = async (event: any) => {
	const result = await initializeDataSourceValid(event, zSyncAccount);

	if (result.success) {
		return await syncServerUser(result.data as SyncAccount);
	}
};

export const syncServerUser = async (syncUser: SyncAccount) => {
	const newUser: UserEntity = newUserWithPreferences(syncUser);

	const mailAddress = newUser.mailAddress;
	const persisted = await findBy(User, { mailAddress });

	if (!persisted) {
		return await conclude(
			AppDataSource.getRepository(User).save(newUser),
			(data) => {
				return data;
			},
			dataBaseError
		);
	} else {
		await conclude(
			AppDataSource.getRepository(User).update(
				{ mailAddress },
				{
					...changeSyncedUser(persisted, syncUser),
					hashedPassword: null,
				}
			),
			dataBaseError
		);
		return await findBy(User, { mailAddress });
	}
};

function changeSyncedUser(persisted: UserEntity, data: SyncAccount) {
	const { phoneNumber, photoURL, uid } = data;

	persisted.serviceImageUrl = photoURL;
	persisted.uid = uid;
	persisted.verified = true;

	if (!persisted.phone) {
		persisted.phone = phoneNumber;
	}
	if (!persisted.photoMimeType) {
		persisted.photoMimeType = "url";
	}

	return persisted;
}
function newUserWithPreferences(data: SyncAccount): UserEntity {
	const { displayName, email, phoneNumber, photoURL, uid } = data;
	const UUID = uuidv4();
	const newUser: UserEntity = {
		id: UUID,
		uid,
		phone: phoneNumber,
		mailAddress: email,
		firstName: displayName,
		serviceImageUrl: photoURL,
		photoMimeType: "url",
		lastName: "",
		verified: true,
		role: "user",
		preferences: {
			userId: UUID,
			birthDateVisible: false,
			addressVisible: false,
			mailAddressVisible: false,
			phoneVisible: false,
			theme: "system",
			thDark: colorThemes.find((c) => c.name == "classic dark")!.code,
			thLight: colorThemes.find((c) => c.name == "classic light")!.code,
			thPrefered: colorThemes.find((c) => c.name == "mugiwara")!.code,
		},
	} as any;

	return newUser;
}
