import { success } from "zod";
import data from "./.json";
export default defineEventHandler(async (event) => {
	const { token, action } = await readBody(event);

	const projectId = process.env.GCP_PROJECT_ID;
	const siteKey = process.env.RECAPTCHA_SITE_KEY;
	const apiKey = process.env.RECAPTCHA_API_KEY;

	const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`;

	try {
		const { tokenProperties } = (await $fetch(url, {
			method: "POST",
			body: {
				event: {
					token,
					siteKey,
					expectedAction: action, // optional
				},
			},
		})) as { tokenProperties: TokenProperties };
		return {
			success: tokenProperties.valid,
			errors: [{ path: ["captcha"], message: tokenProperties.invalidReason }],
			data: tokenProperties,
		};
		return { success: true, message: "test succeed", data: tokenProperties };
	} catch (err) {
		logIt(err, "error");
		return {
			success: false,
			errors: [{ path: ["captcha"], message: "failed" }],
		};
	}
});
