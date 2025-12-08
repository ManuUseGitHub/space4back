import { putUser } from "~/utils/data";

export const setup = (state: StateModifyUser) => {
	onMounted(() => {
		setTimeout(() => {
			state.gender = state.gender ?? "m";
		}, 500);
	});
};

export const onSubmit = (state: StateModifyUser & {visible:boolean}) => {
	state.isLoading = true;
	refreshOnSuccess(putUser(state), state);
	state.isLoading = false;
    state.visible = false;
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
