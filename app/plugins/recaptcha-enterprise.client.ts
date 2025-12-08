export default defineNuxtPlugin(() => {
	return {
		provide: {
			loadRecaptchaEnterprise: () => {
				return new Promise((resolve) => {
					// Already loaded & initialized
					if (window.grecaptcha?.enterprise) {
						return window.grecaptcha.enterprise.ready(() => {
							resolve(window.grecaptcha.enterprise);
						});
					}

					// Load script
					const script = document.createElement("script");
					script.src =
						"https://www.google.com/recaptcha/enterprise.js?render=explicit";
					script.async = true;
					script.defer = true;

					script.onload = () => {
						// Wait for full enterprise initialization
						window.grecaptcha.enterprise.ready(() => {
							resolve(window.grecaptcha.enterprise);
						});
					};

					document.head.appendChild(script);
				});
			},
		},
	};
});
