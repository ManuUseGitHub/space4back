export const formatDate = (date: Date) => {
	const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
	const day = String(date.getDate()).padStart(2, "0");
	const year = date.getFullYear();
	return `${month}/${day}/${year}`;
};

export const parseDates = (obj: any) => {
	Object.keys(obj).forEach((k) => {
		const value = obj[k];
		if (/^[\d]{4}-[\d]{2}-[\d]{2}T.*/.test(value)) obj[k] = new Date(value);
	});
	return obj;
};

export const transformDate = (date: string): string => {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	};
	return new Date(date).toLocaleDateString("en-US", options);
};


