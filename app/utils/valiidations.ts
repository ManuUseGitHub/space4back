export const validatePassword = (password: string) => {
	// 1. Check presence of required character types
	if (!/[a-z]/.test(password)) {
		return {
			success: false,
			message: "The password must contain at least one lower letter.",
		};
	}

	if (!/[A-Z]/.test(password)) {
		return {
			success: false,
			message: "The password must contain at least one capital letter.",
		};
	}

	if (!/\d/.test(password)) {
		return {
			success: false,
			message: "The password must contain at least one number.",
		};
	}

	if (!/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(password)) {
		return {
			success: false,
			message: "The password must contain at least one special character.",
		};
	}

	// 2. Then check minimum length
	if (password.length < 8) {
		return {
			success: false,
			message: "The password must be at least 8 characters long.",
		};
	}

	return { success: true, message: "unknown" };
};

export const runPasswordValidation = (
	inValidate: ValidationCB,
	refreshFld: FieldCB,
	state: { timer: any; password: string }
) => {
	if (state.timer) {
		clearTimeout(state.timer);
	}

	state.timer = setTimeout(() => {
		const { success, message } = validatePassword(state.password);

		if (state.password) {
			if (!success) {
				inValidate({ path: ["password"], message });
			} else {
				refreshFld("password");
			}
		}
	}, 1000);
};
