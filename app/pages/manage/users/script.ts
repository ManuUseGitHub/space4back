import type { ToastServiceMethods } from "primevue";

const setup = async (props: any) => {};

const getUsers = async () => {
	return await $fetch("/api/users");
};

export const loadUsers = async (toast: ToastServiceMethods) => {
	const data = await getDirectUsers();
	if (data.success) {
		return data.users;
	} else {
		toastError(toast, "no user could be fetched");
		return [];
	}
};

const getDirectUsers = async () => {
	return await $fetch("/api/users/", { method: "GET" });
};

export { setup, getUsers };
