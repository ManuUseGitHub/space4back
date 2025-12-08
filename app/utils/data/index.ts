import type { ToastServiceMethods } from "primevue";
import { readjustDate } from "~~/server/utils/common/dateCalculation";

export const putUser = async (state: StateModifyUser) => {
	state.theme = state.theme;
	const record: any = { ...state };
	return JSON.stringify(
		await $fetch("/api/user/" + state.id, {
			method: "PUT",
			body: { ...record },
		}).catch((e) => {
			toastError(state.toast, e.errorMessage);
		})
	);
};

export const postUser = async (
	state: StateCreateUser & { hashedPassword: string | undefined }
) => {
	if (state.user.birthDate) {
		state.user.birthDate = readjustDate(state.user.birthDate)!;
	}
	const result: { success: boolean; error: any[] } = (await $fetch(
		"/api/users",
		{
			method: "POST",
			body: { ...state.user, hashedPassword: state.hashedPassword },
		}
	).catch((e) => {
		toastError(state.toast, e.errorMessage);
	})) as any;

	if (!result.success) {
		result.error = result.error.map((e) => {
			if (e.path[0] == "hashedPassword") {
				e.path = ["password"];
			}
			return e;
		});
		toastError(state.toast, "there were some errors while singing up");
	}

	return result;
};

export const putExperience = async (
	state: StateModifyExperience,
	toast: ToastServiceMethods
) => {
	const record: any = { ...state };
	return JSON.stringify(
		await $fetch("/api/experiences", {
			method: "PUT",
			body: { ...record },
		}).catch((e) => {
			toastError(toast, e.errorMessage);
		})
	);
};

export const createExperience = async (
	state: StateModifyExperience,
	toast: ToastServiceMethods
) => {
	const record: any = { ...state };
	return JSON.stringify(
		await $fetch("/api/experiences", {
			method: "POST",
			body: { ...record },
		}).catch((e) => {
			toastError(toast, e.errorMessage);
		})
	);
};
