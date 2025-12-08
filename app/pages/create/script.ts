import { postUser } from "~/utils/data";
import { getHashedPassword } from "~~/server/utils/common/hash";

export const grecaptchaToken = ref("");
export const resetedUser = () => {
	return {
		firstName: "",
		phone: "",
		lastName: "",
		address: "",
		mailAddress: "",
		birthDate: undefined,
	};
};

export const onSubmit = async (
	oldState: StateCreateUser,
	passwords: { password: string },
	selectedCode: { code: string; dial: string },
	errors: ValidationError[],
	errorCb: ErrorCB,
	cbResponse: (response: any) => void
) => {
	const state = JSON.parse(JSON.stringify(oldState));
	state.toast = oldState.toast;
	oldState.isLoading = true;
	state.user.phone = (state.user.phone || "").replace(
		new RegExp(/^0/),
		selectedCode.dial
	);

	const hashedPassword = passwords.password
		? getHashedPassword(passwords.password)
		: undefined;

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
		cbResponse(refreshOnSuccess(postUser({ ...state, hashedPassword }), state));
	}
	oldState.isLoading = false;
};

async function refreshOnSuccess(result: Promise<any>, state: StateCreateUser) {
	const response: any = (await result) as any;
	if (response.success) {
		toastSuccess(state.toast, `${state.user.firstName} is Saved successfuly !`);
		state.user = resetedUser() as any;
	}
	return response;
}
