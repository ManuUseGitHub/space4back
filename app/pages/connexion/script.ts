export const state = ref({
	mailAddress: "",
	isLoading: false,
	password: "",
	timer: setTimeout(() => {}),
});
export const grecaptchaToken = ref("");
export const submit = async (
	errorCb: ErrorCB,
	errors: ValidationError[],
	onSuccessCb: () => void, afterSubmit : ()=> void
) => {

	if (!errors.length) {
		const captchaTest: any = await $fetch("/api/captcha/", {
			method: "post",
			body: {
				token: grecaptchaToken.value,
				action: "login", //https://docs.cloud.google.com/recaptcha/docs/actions-website
			},
		});
		if (!captchaTest.success) {
			logIt(captchaTest.errors, "error");
			errorCb(captchaTest.errors);
			return;
		}

		$fetch("/api/connexion/login/password/", {
			method: "post",
			body: {
				email: state.value.mailAddress,
				password: state.value.password,
			},
		}).then((data: any) => {
			if (data.error) {
				errorCb(data.error);
			} else {
				onSuccessCb();
			}
			afterSubmit()
		});
	}
};

export const isSubmitable = (hasError: boolean, errors: ValidationError[]) => {
	if(!hasError)
		return true;
	const faildLogin = errors.find((e) => e.path[0] == "password")?.message ==
			"Invalid email or password"
	return faildLogin;
};

export const getErrorTooltip = (hasError: boolean, errors: ValidationError[]) => {
	console.log(errors)
	return ;
};

export const onPassword = (invalidate: ValidationCB, refreshFld: FieldCB) => {
	runPasswordValidation(invalidate, refreshFld, state.value);
};
