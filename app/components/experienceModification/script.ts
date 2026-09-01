import type { ToastServiceMethods } from "primevue";
import { createExperience, putExperience } from "~/utils/data";
import type { ExperienceDTO } from "~~/server/DB/DTOs";

export const state = ref<StateModifyExperience>({
	...({} as ExperienceDTO),
	isLoading: false,
	visible: false,
});
export const compose = ref<StateComposeExperience>({
	sameForClient: false,
	sameForRole: false,
	mode: "edit",
});

const getDateStart = () =>
	state.value.monthStart && state.value.yearStart
		? `${state.value.monthStart} / ${state.value.yearStart}`
		: "";
const getDateEnd = () =>
	state.value.monthEnd && state.value.yearEnd
		? `${state.value.monthEnd} / ${state.value.yearEnd}`
		: "";

const thisYear = new Date().getFullYear();
const open = (exp: ExperienceDTO) => {
	if (exp.id == undefined) {
		compose.value.mode = "create";
	} else {
		compose.value.mode = "edit";
	}

	state.value = JSON.parse(JSON.stringify({ ...state.value, ...exp }));
	state.value.visible = true;
	setup(state.value, compose);
};

const updateDateStart = (month: number, year: number) => {
	state.value.monthStart = month;
	state.value.yearStart = year;
};

const updateDateEnd = (month: number, year: number) => {
	state.value.monthEnd = month;
	state.value.yearEnd = year;
};

const sameForClientChanged = (toast: ToastServiceMethods) => {
	if (
		compose.value.sameForClient &&
		state.value.client != state.value.employer
	) {
		toastSuccess(
			toast,
			"value applied",
			"client has the same value as employer now",
		);
		state.value.client = state.value.employer;
	}
};
const sameForRoleChanged = (toast: ToastServiceMethods) => {
	if (compose.value.sameForRole && state.value.role != state.value.title) {
		toastSuccess(
			toast,
			"value applied",
			"role has the same value as title now",
		);
		state.value.role = state.value.title;
	}
};
const setup = (state: StateModifyExperience, compose: any) => {
	if (state.employer == state.client) {
		compose.value.sameForClient = true;
	}
	if (state.title == state.role) {
		compose.value.sameForRole = true;
	}
};
const updateClient = () => {
	if (compose.value.sameForClient) {
		state.value.client = state.value.employer;
	}
};
const updateRole = () => {
	if (compose.value.sameForRole) {
		state.value.role = state.value.title;
	}
};
const onSubmit = (toast: ToastServiceMethods) => {
	state.value.isLoading = true;
	if (compose.value.mode == "edit") {
		putExperience(state.value, toast);
	} else {
		createExperience(state.value, toast);
	}

	state.value.isLoading = false;
	state.value.visible = false;
};
export const v = {
	getDateStart,
	getDateEnd,
	onSubmit,
	open,
	sameForClientChanged,
	sameForRoleChanged,
	thisYear,
	updateClient,
	updateRole,
	updateDateStart,
	updateDateEnd,
};
