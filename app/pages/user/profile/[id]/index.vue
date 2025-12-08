<script setup lang="ts">
import "primeicons/primeicons.css";
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import type { UserPreferencesDTO } from "~~/server/DB/DTOs";

const route = useRoute();

const id = route.params.id;
const data: any = await $fetch("/api/user/" + id);
const userPreferences = parseDates(data) as UserPreferencesDTO;
const toast = useToast();

const state = ref({
  ...userPreferences,
  isLoading: false,
  toast,
});
const isSame = ref<Boolean>();
const personRef = ref();
const themingRef = ref();

onMounted(async () => {
  isSame.value = await $fetch("/api/connexion/same", { method: "post", body: { id } });
});
const openPerson = () => {
  personRef.value.open();
};
const openTheme = () => {
  themingRef.value.open();
};
const hasState = computed(() => {
  return state.value;
});
</script>
<template>
  <div
    id="banner"
    class="justify-items-center content-end flex-col mb-3 h-72 p-2 relative"
  >
    <ProfilePicture :editable="!!isSame"></ProfilePicture>
    <BannerPicture :editable="!!isSame"></BannerPicture>
  </div>
  <div class="container" v-if="hasState">
    <MegaHeaderPresentation
      :title-space="'presenteation'"
      :space="' I'"
    ></MegaHeaderPresentation>
    <div class="container info-pane d-flex">
      <div class="row">
        <div class="col-md-9 relative">
          <ProfileInfos :raw-preferences="userPreferences" :birth-date="data.birthDate">
            <div
              v-if="isSame"
              @click="openPerson()"
              class="edit-button p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
            >
              <span :class="icons.pPencil"></span>
            </div>
          </ProfileInfos>
        </div>
        <div class="col-md-3 relative d-flex flex-col gap-3">
          <ThemeInfos :raw-preferences="userPreferences">
            <div
              v-if="isSame"
              @click="openTheme()"
              class="edit-button p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
            >
              <span :class="icons.pPencil" @click=""></span>
            </div>
          </ThemeInfos>
        </div>
      </div>
    </div>

    <PersonModification
      :raw-preferences="userPreferences"
      :birth-date="data.birthDate"
      ref="personRef"
    ></PersonModification>
    <hr />
    <ThemingModification
      :rawPreferences="userPreferences"
      ref="themingRef"
    ></ThemingModification>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped></style>
