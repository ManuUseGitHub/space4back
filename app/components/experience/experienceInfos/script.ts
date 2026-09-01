import type { CategorizedDTO, ExperienceDTO, LovCollection } from "~~/server/DB/DTOs";

const getCollectedLovs = (exp: ExperienceDTO) => {
  const sortedCategories = [...exp.categories].sort((a, b) => a.order - b.order);

  return sortedCategories.map((category) => ({
    order: category.order,
    cat: category,
    value: category.value,
    style: category.style,
    items: exp.lov.find((x) => x.order == category.order)?.items, // retain the reference to exp.lov if that’s intentional
  }));
};

const filterItemsFromLov = (lov: LovCollection[], cat: CategorizedDTO) => {
	return lov!.find((x) => x.order === cat.order)?.items;
};

const favoritedClass = (exp: ExperienceDTO) => {
  return exp.favorite ? "favorited" : "";
};


const onFavorite = (exp: ExperienceDTO) => {
    exp.favorite = !exp.favorite;
};

export const v = {
    onFavorite,
    getCollectedLovs,
    filterItemsFromLov,
    favoritedClass
}