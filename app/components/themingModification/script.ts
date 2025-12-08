import { putUser } from "~/utils/data";

export const setup = (state: StateModifyUser, thState: StateModifyTheme) => {
	onMounted(() => {
		setTimeout(() => {
			state.theme = state.theme ?? "light";
			thState.thDark = { code: state.thDark };
			thState.thLight = { code: state.thLight };
			thState.thPrefered = { code: state.thPrefered };
		}, 500);
	});
};

export const onSubmit = (state: StateModifyUser) => {
	state.isLoading = true;
	refreshOnSuccess(putUser(state), state);
	state.isLoading = false;
};


async function refreshOnSuccess(
	result: Promise<string | void>,
	state: StateModifyUser
) {
	const response = await result;
	if (response) {
		toastSuccess(state.toast, response || "");
	}
}