<script setup lang="ts">

import type { UserPreferencesDTO } from "~~/server/DB/DTOs";
import { onSubmit, setup } from "./script";
import { excludedDarkThemes, excludedLightThemes, themes, colorThemes } from "~/utils/common/misc";

const props = defineProps<{ rawPreferences: UserPreferencesDTO }>();
const userPreferences = props.rawPreferences;
const toast = useToast();

const state = ref({
  ...userPreferences,
  isLoading: false,
  toast,
  visible: false,
});

const thState = ref({
  thLight: { code: userPreferences?.thLight || "LGT_classic" },
  thDark: { code: userPreferences?.thDark || "DRK_classic" },
  thPrefered: { code: userPreferences?.thPrefered || "blueprint" },
});

const onPickedTheme = (event: {
  field: "thLight" | "thDark" | "thPrefered";
  code: string;
}) => {
  const { field, code } = event;
  if (code != thState.value[field].code) {
    thState.value[field] = { code };
    state.value[field] = code;
  }
};

const open = () => {
  state.value.visible = true;
}
defineExpose({ open })

setup(state.value, thState.value);
</script>
<template>
  <Dialog v-model:visible="state.visible" modal header="Edit Profile" class="w-fit m-5">
    <form @submit.prevent="onSubmit(state)">
      <div class="row">
        <div class="col"><h3>Preferences</h3></div>
      </div>
      <div class="row">
        <div class="col-8">
          <SelectButton
            v-model="state.theme"
            :options="themes"
            optionLabel="value"
            optionValue="value"
            dataKey="value"
            @pick="onPickedTheme"
            aria-labelledby="custom"
          >
            <template #option="slotProps">
              <span :class="slotProps.option.icon"></span>
              {{ slotProps.option.value }}
            </template>
          </SelectButton>
        </div>
        <div class="col-4">
          <template v-if="state.theme == 'light'">
            <ThemeSelector
              :colorThemes="excludedDarkThemes"
              name="thLight"
              :model="thState.thLight"
              @pick="onPickedTheme"
              place-holder-text="Light theme"
            >
              <span :class="icons.pSun"></span>
            </ThemeSelector>
          </template>
          <template v-else-if="state.theme == 'dark'">
            <div>
              <ThemeSelector
                :colorThemes="excludedLightThemes"
                name="thDark"
                :model="thState.thDark"
                @pick="onPickedTheme"
                place-holder-text="Dark theme"
                ><span :class="icons.pMoon"></span
              ></ThemeSelector>
            </div>
          </template>
          <template v-else-if="state.theme == 'system'">
            <div class="col">
              <div class="d-flex flex-col gap-3">
                <ThemeSelector
                  :colorThemes="excludedDarkThemes"
                  name="thLight"
                  :model="thState.thLight"
                  @pick="onPickedTheme"
                  place-holder-text="Light theme"
                  ><span :class="icons.pSun"></span
                ></ThemeSelector>
                <ThemeSelector
                  :colorThemes="excludedLightThemes"
                  name="thDark"
                  :model="thState.thDark"
                  @pick="onPickedTheme"
                  place-holder-text="Dark theme"
                  ><span :class="icons.pMoon"></span
                ></ThemeSelector>
              </div>
            </div>
          </template>
          <template v-else>
            <div>
              <ThemeSelector
                :colorThemes="colorThemes"
                name="thPrefered"
                :model="thState.thPrefered"
                @pick="onPickedTheme"
                place-holder-text="Prefered theme"
                ><span :class="icons.pStar"></span
              ></ThemeSelector>
            </div>
          </template>
        </div>
      </div>
      <div class="button-container d-flex items-center mt-3">
        <div class="flex justify-center gap-2">
          <div>
            <Button
              class="save-button"
              severity="secondary"
              unstyled
              type="button"
              @click="state.visible = false"
            >
              <span v-if="state.isLoading" aria-busy="true"></span>
              <template v-else><span :class="icons.pTimes"></span></template
            ></Button>
          </div>
          <div>
            <Button
              class="save-button"
              severity="secondary"
              unstyled
              :type="!state.isLoading ? 'submit' : 'button'"
            >
              <span v-if="state.isLoading" aria-busy="true"></span>
              <template v-else> <span :class="icons.pSave"></span></template>
            </Button>
          </div>
        </div>
      </div>
    </form>
  </Dialog>
</template>

<style src="./style.scss" lang="scss"></style>
