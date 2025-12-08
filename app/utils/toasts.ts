import type { ToastServiceMethods } from "primevue";

export const toastSuccess = (
	toast: ToastServiceMethods,
	summary: string = "Something good happen !",
	detail?: string
) => {
	toast.add({
		severity: TOAST_SEVERITY.SUCCESS,
		summary,
		detail,
		life: 3000,
	});
};

export const toastError = (
	toast: ToastServiceMethods,
	summary: string = "Something bad happen !",
	detail?: string
) => {
	toast.add({
		severity: TOAST_SEVERITY.ERROR,
		summary,
		detail,
		life: 3000,
	});
};
