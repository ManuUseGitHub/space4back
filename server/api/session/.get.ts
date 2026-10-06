export default defineEventHandler(async (event) => {
    return await getCurrentSession(event)
});
