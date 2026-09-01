import { registerPatch, generateHash } from "~~/server/utils/common/hash";
import type { ExperienceDTO, ExperiencesToPatch, UserWithExperiencesDTO } from "~~/server/DB/DTOs";

let patchList: ExperiencesToPatch[] = [] as any;
let hashList: string[] = [];

export const state = ref({
    ...({} as UserWithExperiencesDTO),
    isLoading: false
});

export const compose = ref({ patchL: patchList, hashL: hashList });

const onPatch = (event: any) => {
    registerPatch(event, compose.value.patchL, compose.value.hashL);
};
const onSwapUp = (exp: ExperienceDTO) => {
    const target = state.value?.experiences.find(x => x.order == exp.order - 1);
    if (target) {
        const temp = target.order;
        target.order = exp.order;
        exp.order = temp;
        afterSwitchOrder(target, exp);
    }
};
const onSwapDown = (exp: ExperienceDTO) => {
    const target = state.value?.experiences.find(x => x.order == exp.order + 1);
    if (target) {
        const temp = target.order;
        target.order = exp.order;
        exp.order = temp;
        afterSwitchOrder(target, exp);
    }
};

function afterSwitchOrder(target: ExperienceDTO, exp: ExperienceDTO) {
    const data1 = {
        id: target.id,
        order: target.order,
        favorite: target.favorite
    };
    const hash1 = generateHash(data1);
    const data2 = { id: exp.id, order: exp.order, favorite: exp.favorite };
    const hash2 = generateHash(data2);

    registerPatch({ hash: hash1, data: data1 }, compose.value.patchL, compose.value.hashL);
    registerPatch({ hash: hash2, data: data2 }, compose.value.patchL, compose.value.hashL);
}

const applyPatches = () => {
    $fetch("/api/experiences/", {
        method: "PATCH",
        body: { experiences: compose.value.patchL }
    }).then(_ => {
        compose.value.patchL = [];
        compose.value.hashL = [];
    });
};

const setup = (rawData: UserWithExperiencesDTO) => {
    state.value = { ...rawData, isLoading: false };
};

export const v = {
    setup,
    onSwapUp,
    onSwapDown,
    onPatch,
    applyPatches
};
