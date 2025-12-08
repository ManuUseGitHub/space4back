<script setup lang="ts">
const nuxt = useNuxtApp();
const slots = useSlots();
let widgetId: number | null = null;
const generatedToken = ref("");
const hasSlot = (name: string) => {
  return !!slots[name];
};
const { compact, errors, field } = defineProps<{
  compact?: boolean;
  field:string;
  errors: ValidationError[];
}>();
const emit = defineEmits(["token"]);
onMounted(async () => {
  nuxt.$loadRecaptchaEnterprise().then((recaptcha) => {
    widgetId = recaptcha.render("captcha-enterprise", {
      sitekey: getCaptchaKey(),
      size: compact ? "compact" : undefined,
      callback: (token: string) => {
        generatedToken.value = token;
        emit("token", token);
      },
      theme: document.documentElement.className,
    });
  });
});
// Allow parent to reset the widget
defineExpose({
  reset: () => {
    const gre = window.grecaptcha?.enterprise;
    if (gre && widgetId !== null) {
      gre.reset(widgetId);
    }
    generatedToken.value = ""
  },
});
</script>
<template>
  <FieldChecked
    :container-class="'col-12'"
    :errors="errors"
    :field="field"
    :label="''"
    :icon="icons.pAndroid"
    required
  >
    <template #default>
      <div
        role="bloc-field"
        class="flex gap-4 justify-center border p-2 w-full rc-wrapper"
      >
        <div v-if="hasSlot('default')" class="grow h-full content-center text-center">
          <slot></slot>
        </div>
        <div id="captcha-enterprise"></div>
        <InputText type="hidden" v-model="generatedToken"></InputText>
      </div>
    </template>
  </FieldChecked>
</template>
<style src="./style.scss" lang="scss"></style>
