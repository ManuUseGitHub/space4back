export const ageFromDate = (dateOfBirth: Date) => {
	const today = new Date();

	const diffInMilliSeconds = today.getTime() - dateOfBirth.getTime();
	const diffInYears = diffInMilliSeconds / 1000 / 60 / 60 / 24 / 365.25;

	return Math.abs(Math.round(diffInYears));
};


export const readjustDate = (date?: Date) => {
	if (date) {
		const dateInput = new Date(date);
		const offset = dateInput.getTimezoneOffset();
		return new Date(dateInput.getTime() - offset * 60 * 1000);
	}
	return date;
};