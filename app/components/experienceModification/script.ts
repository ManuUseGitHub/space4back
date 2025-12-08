import type { ToastServiceMethods } from "primevue";
import { createExperience, putExperience } from "~/utils/data";
import type { CategorizedDTO, ExperienceDTO } from "~~/server/DB/DTOs";

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
const getIconOfCategory = (cat: CategorizedDTO) =>
	cat.style == "list" ? icons.pList : icons.pkey;
const getCategoriesOrdered = () => {
	return state.value.categories.sort((a, b) => {
		return a.order - b.order;
	});
};
const pushDown = (cat: CategorizedDTO) => {
	const categories = state.value.categories;
	const i = categories.findIndex((x) => x.value === cat.value);
	if (i < 0 || i === categories.length - 1) return; // can't push last down

	const next = categories[i + 1]!;
	const temp = filterItemsFromLov(next);
	state.value.lov[i + 1]!.items = filterItemsFromLov(cat)!;
	state.value.lov[i]!.items = temp!;

	const currentOrder = cat.order;

	state.value.lov[i + 1]!.category = cat.value;
	state.value.lov[i]!.category = next.value;
	cat.order = next.order;
	next.order = currentOrder;

	state.value.categories = categories;
};
const pushUp = (cat: CategorizedDTO) => {
	const categories = state.value.categories;
	const i = categories.findIndex((x) => x.value === cat.value);
	if (i <= 0) return; // can't push first up

	const prev = categories[i - 1]!;
	const temp = filterItemsFromLov(prev);
	state.value.lov[i - 1]!.items = filterItemsFromLov(cat)!;
	state.value.lov[i]!.items = temp!;

	const currentOrder = cat.order;

	state.value.lov[i - 1]!.category = cat.value;
	state.value.lov[i]!.category = prev.value;
	cat.order = prev.order;
	prev.order = currentOrder;

	state.value.categories = categories;
};
const removeLov = (cat: CategorizedDTO, lov: CategorizedDTO) => {
	const list = filterItemsFromLov(cat)!;
	const index = list.findIndex((l) => l.order == lov.order);

	list.splice(index, 1);
};
const addLovTo = (cat: CategorizedDTO) => {
	const list = filterItemsFromLov(cat)!;
	list.push({ order: 0, value: "" });
	list.forEach((x, index) => {
		x.order = index + 1;
	});
};
const updateLovCategory = (cat: CategorizedDTO) => {
	findLovFromCategory(cat)!.category = cat.value;
};
const reorderSections = () => {
	state.value.categories = state.value.categories.map((x, i) => {
		x.order = i + 1;
		return x;
	});

	state.value.lov = state.value.lov.map((x, i) => {
		x.order = i + 1;
		return x;
	});
};
const deleteSection = (cat: CategorizedDTO) => {
	const categories = state.value.categories;
	const i = categories.findIndex((x) => x.value === cat.value);
	state.value.categories.splice(i, 1);
	state.value.lov.splice(i, 1);
	reorderSections();
};

const updateDateStart = (month: number, year: number) => {
	state.value.monthStart = month;
	state.value.yearStart = year;
};

const updateDateEnd = (month: number, year: number) => {
	state.value.monthEnd = month;
	state.value.yearEnd = year;
};
const addSection = (style: string) => {
	const greatOrder = Math.max(0, ...state.value.categories.map((x) => x.order));

	state.value.categories.push({
		order: greatOrder + 1,
		category: greatOrder + 1,
		value: "",
		style: style,
	});

	console.log(greatOrder + 1);

	state.value.lov.push({
		order: greatOrder + 1,
		category: "",
		items: [],
	});
};
const toggleStyle = (cat: CategorizedDTO) => {
	cat.style =
		cat.style == SECTION_STYLE.LIST ? SECTION_STYLE.KEYS : SECTION_STYLE.LIST;
};
const filterItemsFromLov = (cat: CategorizedDTO) => {
	return state.value.lov!.find((x) => x.order === cat.order)?.items;
};
const findLovFromCategory = (cat: CategorizedDTO) => {
	return state.value.lov!.find((x) => x.order === cat.order);
};
const sameForClientChanged = (toast: ToastServiceMethods) => {
	if (
		compose.value.sameForClient &&
		state.value.client != state.value.employer
	) {
		toastSuccess(
			toast,
			"value applied",
			"client has the same value as employer now"
		);
		state.value.client = state.value.employer;
	}
};
const sameForRoleChanged = (toast: ToastServiceMethods) => {
	if (compose.value.sameForRole && state.value.role != state.value.title) {
		toastSuccess(
			toast,
			"value applied",
			"role has the same value as title now"
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
async function refreshOnSuccess(
	result: Promise<string | void>,
	state: StateModifyUser
) {
	const response = await result;
	if (response) {
		toastSuccess(state.toast, response || "");
	}
}
export const v = {
	addLovTo,
	addSection,
	deleteSection,
	filterItemsFromLov,
	getCategoriesOrdered,
	getIconOfCategory,
	getDateStart,
	getDateEnd,
	onSubmit,
	open,
	pushDown,
	pushUp,
	removeLov,
	sameForClientChanged,
	sameForRoleChanged,
	thisYear,
	toggleStyle,
	updateLovCategory,
	updateClient,
	updateRole,
	updateDateStart,
	updateDateEnd,
};
