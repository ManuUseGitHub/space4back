import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig().public.firebaseConfig;
	const app = getApps().length ? getApps()[0] : initializeApp(config);
	const auth = getAuth(app);

	return {
		provide: { firebase: app, auth },
	};
});
