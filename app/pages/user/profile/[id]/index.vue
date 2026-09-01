<script setup lang="ts">
import "primeicons/primeicons.css";
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import type { UserPreferencesDTO, UserWithExperiencesDTO } from "~~/server/DB/DTOs";
import auth from "~/middleware/auth";
definePageMeta({
  middleware: auth,
});
const route = useRoute();
const { asVisitor } = route.query;

const id = route.params.id as string;
const data: any = await $fetch("/api/user/" + id);
const userPreferences = parseDates(data) as UserPreferencesDTO;
const toast = useToast();

const state = ref({
  ...userPreferences,
  isLoading: false,
  toast,
});
const isVisitor = ref<Boolean>(true);
const isSame = ref<Boolean>(false);

const personRef = ref();
const themingRef = ref();

onMounted(async () => {
  isSame.value = await $fetch("/api/connexion/same", { method: "post", body: { id } });
  isVisitor.value = !(!asVisitor && isSame.value);
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
    v-if="isVisitor"
    id="banner"
    class="justify-items-center content-end flex-col mb-3 h-72 p-2 relative"
  >
    <ProfilePicture :editable="!isVisitor"></ProfilePicture>
    <BannerPicture :editable="!isVisitor"></BannerPicture>
  </div>
  <div class="" v-if="hasState">
    <div class="d-flex p-3 gap-6">
      <div class="col max-w-fit" v-if="!isVisitor">
        <div class="relative d-flex flex-col gap-3">
          <ProfileShortSummary
            :is-visitor="!isVisitor"
            :raw-preferences="userPreferences"
            :birth-date="data.birthDate"
          ></ProfileShortSummary>
          <div class="border p-3">
            <ThemeInfos :raw-preferences="userPreferences">
              <div
                v-if="!isVisitor"
                @click="openTheme()"
                class="edit-button p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
              >
                <span :class="icons.pPencil" @click=""></span>
              </div>
            </ThemeInfos>
          </div>
        </div>
      </div>
      <div class="col flex-1">
        <div class="row">
          <div class="col-md-12 relative">
            <ProfileInfos
              :is-visitor="!isVisitor"
              :is-same="isSame"
              :raw-preferences="userPreferences"
              :birth-date="data.birthDate"
            >
              <div
                v-if="!isVisitor"
                @click="openPerson()"
                class="edit-button p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
              >
                <span :class="icons.pPencil"></span>
              </div>
            </ProfileInfos>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PersonModification
    :raw-preferences="userPreferences"
    :birth-date="data.birthDate"
    ref="personRef"
  ></PersonModification>
  <ThemingModification
    :rawPreferences="userPreferences"
    ref="themingRef"
  ></ThemingModification>
</template>
<style src="./style.scss" lang="scss" scoped></style>
