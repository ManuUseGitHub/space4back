import data from "./treenodes.json"

export default defineEventHandler(async (event) => {
	//return getLogFile(process.env.APP_ENV || "development");
	return data;
});
