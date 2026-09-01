import { signOut } from "firebase/auth";
export const signout = async () => {
	const { $auth } = useNuxtApp();
	await $fetch("/api/connexion/logout", { method: "POST" });
	await signOut($auth);
};
