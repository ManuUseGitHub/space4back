export const validatePhone = (phone: string) => {
	// 1. Check presence of required character types
	if (!/^[0].*/.test(phone)) {
		return {
			success: false,
			message: "The phone number should start with zero",
		};
	}
	if (/^((?:0+[^\d]?)+)(0.*$)/.test(phone)) {
		return {
			success: false,
			message: "The phone number should start with only one zero",
		};
	}

	if (!/^(?=0)(?=(?:.*\d){7,18})[0-9\s()\/.-]+$/.test(phone)) {
		return {
			success: false,
			message: "The number should be a phone number. See examples (?)",
		};
	}

	return { success: true, message: "unknown" };
};
