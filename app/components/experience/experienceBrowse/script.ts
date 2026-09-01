import type {
	ExperiencesToPatch,
	UserWithExperiencesDTO,
} from "~~/server/DB/DTOs";

const setup = (
	rawData: UserWithExperiencesDTO
) => {
	state.value = rawData;
};

const loadNewExperience = (experienceRef: any) => {
	const nextOrder =
		Math.max(...state.value!.experiences.map((x) => x.order)) + 1;
	experienceRef.value.open({
		userId: state.value!.userId,
		order: nextOrder,
		categories: [],
		lov: [],
	});
};
export const state = ref<UserWithExperiencesDTO>();
export const patches = ref<ExperiencesToPatch>();

export const v = {
	state,
	setup,
	loadNewExperience
};
