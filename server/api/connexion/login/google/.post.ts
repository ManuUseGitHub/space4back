import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { zLoginSocialAccount } from "~~/server/utils/validators/zods";
import jwt from "jsonwebtoken"; // Use your own signing key
import { setSessionCookie } from "~~/server/utils/session";
import { syncServerUser } from "../../sync/request";
import { getSessionUser } from "~~/server/utils/dsource";

const JWT_SECRET = process.env.JWT_SECRET;

export default defineEventHandler(async (event) => {
	const result = await initializeDataSourceValid(event, zLoginSocialAccount);
	if (result.success) {
		const config = useRuntimeConfig().public.firebaseConfig;
		const app = getApps().length ? getApps()[0] : initializeApp(config);
		const adminAuth = getAdminAuth(app);
		logIt(result)
		await adminAuth.verifyIdToken(result.data.idToken);

		const data = await readBody(event);

		// syncing the database but doesn't give the logged user
		const matched = await syncServerUser(data.user);

		// fetching the session user to store in the session. Only few info suffices
		const user: any = await getSessionUser(matched.id);
		if (user) {
			const sessionToken = jwt.sign(user, JWT_SECRET!, {
				expiresIn: "24h",
			});
			setSessionCookie(event, sessionToken);

			return { success: true };
		}
		return { success: false };
	}
});
