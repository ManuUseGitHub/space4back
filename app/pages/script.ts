const setup = async (props: any) => {};

const getTasks = async () => {
	return await useFetch("/api/hello", { lazy: true });
};
const getUsers = async () => {
	return await useFetch("/api/users", { lazy: true });
};

const getDirectUsers = async () => {
	return await $fetch("/api/users/", { method: "GET" });
};

export { setup, getTasks, getUsers, getDirectUsers };
