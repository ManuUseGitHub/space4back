import type {
	CategorizedDTO,
	ExperienceDTO,
	LovCollection,
} from "~~/server/DB/DTOs";

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
const pushDown = (state: StateModifyExperience, cat: CategorizedDTO) => {
	const { categories, lov } = state;

	const i = categories.findIndex((x) => x.value === cat.value);
	if (i < 0 || i === categories.length - 1) return; // can't push last down

	const next = categories[i + 1]!;
	const temp = filterItemsFromLov(lov, next);
	lov[i + 1]!.items = filterItemsFromLov(lov, cat)!;
	lov[i]!.items = temp!;

	const currentOrder = cat.order;

	lov[i + 1]!.category = cat.value;
	lov[i]!.category = next.value;
	cat.order = next.order;
	next.order = currentOrder;
};
const pushUp = (state: StateModifyExperience, cat: CategorizedDTO) => {
	const { categories, lov } = state;

	const i = categories.findIndex((x) => x.value === cat.value);
	if (i <= 0) return; // can't push first up

	const prev = categories[i - 1]!;
	const temp = filterItemsFromLov(lov, prev);
	lov[i - 1]!.items = filterItemsFromLov(lov, cat)!;
	lov[i]!.items = temp!;

	const currentOrder = cat.order;

	lov[i - 1]!.category = cat.value;
	lov[i]!.category = prev.value;
	cat.order = prev.order;
	prev.order = currentOrder;
};
const removeLov = (
	lovs: LovCollection[],
	cat: CategorizedDTO,
	lov: CategorizedDTO,
) => {
	const list = filterItemsFromLov(lovs, cat)!;
	const index = list.findIndex((l) => l.order == lov.order);

	list.splice(index, 1);
};
const addLovTo = (lov: LovCollection[], cat: CategorizedDTO) => {
	const list = filterItemsFromLov(lov, cat)!;
	list.push({ order: 0, value: "" });
	list.forEach((x, index) => {
		x.order = index + 1;
	});
};
const updateLovCategory = (lov: LovCollection[], cat: CategorizedDTO) => {
	findLovFromCategory(lov, cat)!.category = cat.value;
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
const deleteSection = (state: StateModifyExperience, cat: CategorizedDTO) => {
	const { categories, lov } = state;

	const i = categories.findIndex((x) => x.value === cat.value);
	categories.splice(i, 1);
	lov.splice(i, 1);
	reorderSections();
};

const getIconOfCategory = (cat: CategorizedDTO) =>
	cat.style == "list" ? icons.pList : icons.pkey;
const getCategoriesOrdered = (categories: CategorizedDTO[]) => {
	return categories.sort((a, b) => {
		return a.order - b.order;
	});
};
const addSection = (
	state: StateModifyExperience,
	style: string,
	value: string = "",
) => {
	const { categories, lov } = state;

	const greatOrder = Math.max(0, ...categories.map((x) => x.order));

	categories.push({
		order: greatOrder + 1,
		category: greatOrder + 1,
		value,
		style: style,
	});

	lov.push({
		order: greatOrder + 1,
		category: "",
		items: [],
	});
};
const toggleStyle = (cat: CategorizedDTO) => {
	cat.style =
		cat.style == SECTION_STYLE.LIST ? SECTION_STYLE.KEYS : SECTION_STYLE.LIST;
};
const filterItemsFromLov = (lov: LovCollection[], cat: CategorizedDTO) => {
	return lov!.find((x) => x.order === cat.order)?.items;
};
const findLovFromCategory = (lov: LovCollection[], cat: CategorizedDTO) => {
	return lov!.find((x) => x.order === cat.order);
};

export const v = {
	addLovTo,
	addSection,
	deleteSection,
	filterItemsFromLov,
	getCategoriesOrdered,
	getIconOfCategory,
	pushDown,
	pushUp,
	removeLov,
	toggleStyle,
	updateLovCategory,
};
