import type { CategorizedDTO, ExperienceDTO, LovCollection } from "~~/server/DB/DTOs";

export type Category = {
    order: number;
    cat: CategorizedDTO;
    value: string;
    style: string | undefined;
    items: CategorizedDTO[];
};
const getCollectedLovs = (exp: ExperienceDTO): Category[] => {
    const sortedCategories = [...exp.categories].sort((a, b) => a.order - b.order);

    return sortedCategories.map(category => {
        const lovOfOrder = exp.lov.find(x => x.order == category.order);
        return {
            order: category.order,
            cat: category,
            value: category.value,
            style: category.style,
            items: lovOfOrder!.items // retain the reference to exp.lov if that’s intentional
        };
    });
};

const filterItemsFromLov = (lov: LovCollection[], cat: CategorizedDTO) => {
    return lov!.find(x => x.order === cat.order)?.items;
};

export const v = {
    getCollectedLovs,
    filterItemsFromLov
};
