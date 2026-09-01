<script lang="ts" setup>
import { getPickedTheme } from "~/utils/common/misc";
import type { UserPreferencesDTO } from "~~/server/DB/DTOs";

const props = defineProps<{ rawPreferences: UserPreferencesDTO }>();
const userPreferences = props.rawPreferences;
const state = ref({
  ...userPreferences,
  isLoading: false,
  visible: false,
});
const getSchemeLabel = computed(() => {
  switch (state.value.theme) {
    case "light":
    case "dark":
    case "prefered":
      return `always ${state.value.theme}`;
    case "system":
      return `${state.value.theme} (varying)`;
    default:
      return "";
  }
});

const getDarkTheme = computed(() => {
  return getPickedTheme(state.value.thDark);
});
const getLightTheme = computed(() => {
  return getPickedTheme(state.value.thLight);
});
const getPreferedTheme = computed(() => {
  return getPickedTheme(state.value.thPrefered);
});
</script>
<template>
  <div class="relative">
    <slot></slot>
    <h3>Theming</h3>
    <span>Your settings concerning colorations for the course of the daylight</span>
    <hr />
    <h5>Prefered color scheme</h5>
    <div class="border p-3 mb-3 text-center">
      <p class="m-1">{{ getSchemeLabel }}</p>
    </div>
    <h5>Themes</h5>
    <div class="border p-3 text-center">
      <template v-if="state.theme == 'dark'">
        <p class="m-1"><span :class="icons.pMoon"></span> {{ getDarkTheme }}</p>
      </template>
      <template v-if="state.theme == 'light'">
        <p class="m-1"><span :class="icons.pSun"></span> {{ getLightTheme }}</p>
      </template>
      <template v-if="state.theme == 'prefered'">
        <p class="m-1"><span :class="icons.pStar"></span> {{ getPreferedTheme }}</p>
      </template>
      <template v-if="state.theme == 'system'">
        <p class="m-1"><span :class="icons.pSun"></span> {{ getLightTheme }} (day)</p>
        <p class="m-1">
          <span :class="icons.pMoon"></span> {{ getDarkTheme }} (night)
        </p></template
      >
    </div>
  </div>
</template>
