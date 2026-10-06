import { getCurrentSession } from "~~/server/utils/session";

export default defineEventHandler(async event => {
    const { id } = await readBody(event);
	const session = await getCurrentSession(event);
    return session?.id == id;
});
