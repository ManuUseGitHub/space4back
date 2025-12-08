export function constructCategories(
	experience: Record<string, any>,
	categories: any
): any {
	const temp: any = [];
	categorizeText(experience.categories, ({ order, category, style, value }) => {
		temp.push({
			order: parseInt(order),
			category: parseInt(order),
			style,
			value,
		});
		categories[category] = value;
	});
	return temp;
}
export function constructLov(
	experience: Record<string, any>,
	categories: any
): any {
	const items: any = {};
	categorizeText(experience.lov, ({ order, category, value }) => {
		const categoryName = categories[category];
		const categoryOrder = parseInt(category);
		if (!items[categoryOrder]) {
			items[categoryOrder] = {
				order: categoryOrder,
				category: categoryName,
				items: [],
			};
		}
		items[categoryOrder].items.push({ order: parseInt(order), value });
	});
	return items;
}

const categorizeText = (
	text: string,
	onMatch: (match: {
		order: string;
		category: string;
		style: string;
		value: string;
	}) => void
) => {
	let result: any;
	const categorization =
		/\n?(?<order>[\d]+):(?<category>[\d]+):?(?<style>[^\-]+)?-(?<value>.*)/gm;
	while ((result = categorization.exec(text))) {
		onMatch(result.groups);
	}
};
