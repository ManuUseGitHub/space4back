declare module "#app" {
	interface NuxtApp {
		$loadRecaptchaEnterprise: () => Promise<any>;
	}
}

declare module "vue" {
	interface ComponentCustomProperties {
		$loadRecaptchaEnterprise: () => Promise<any>;
	}
}

export {};