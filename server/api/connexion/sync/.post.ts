import { syncUser } from "./request";

export default defineEventHandler(async (event) => {
	return await syncUser(event);
});
