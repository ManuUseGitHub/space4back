<script lang="ts" setup>
import type { UserPreferencesDTO } from "~~/server/DB/DTOs";
import { ref } from "vue";

const props = defineProps<{
  rawPreferences: UserPreferencesDTO;
  birthDate: string;
}>();
const userData = props.rawPreferences;

const state = ref({
  ...userData,
  birthDateString: transformDate(props.birthDate),
});
const route = useRoute();
const { asVisitor } = route.query;

const id = route.params.id as string;

const data: any = await $fetch("/api/user/" + id);
const userPreferences = parseDates(data) as UserPreferencesDTO;

const isVisitor = ref<boolean>(true);
const isSame = ref<boolean>(false);

const toExperiences = () => {
  navigateTo("/uexp/" + userData.id);
};

onMounted(async () => {
  isSame.value = await $fetch("/api/connexion/same", { method: "post", body: { id } });
  isVisitor.value = Boolean(asVisitor || !isSame.value);
});


</script>
<template>
  <div class="d-flex">
    <slot></slot>
    <div class="gap-3">
      <SectionTitle :title="'I'" :topic="'presentation and contact'">
        <div class="d-flex gap-3" v-if="asVisitor">
          <Identity
            :is-visitor="!isVisitor"
            :raw-preferences="userPreferences"
            :birth-date="data.birthDate"
          >
          </Identity>
        </div>
        <h5>Me and my goal?</h5>
        <div class="d-flex">
          <div class="col">
            <p class="p-2">{{ state.professionalGoal }}</p>
          </div>
          <div class="col">
            <p class="p-2 with-left-hr-sep">{{ state.introduction }}</p>
          </div>
        </div>
        <h5 class="pt-2 px-3">Get in touch</h5>
        <div class="contact-info">
          <div
            v-if="state.addressVisible || state.mailAddressVisible || state.phoneVisible"
          >
            <div class="d-flex text-center gap-4 p-3">
              <div v-if="state.addressVisible" class="info">
                <span class="icon-button" :class="icons.pHome"></span
                ><span class="info-content with-top-hr-sep">{{ state.address }}</span>
              </div>
              <div v-if="state.mailAddressVisible" class="info">
                <span class="icon-button" :class="icons.pEnvelope"></span
                ><span class="info-content with-top-hr-sep">{{ state.mailAddress }}</span>
              </div>
              <div v-if="state.birthDateVisible" class="info">
                <span class="icon-button" :class="icons.pCalendar"></span
                ><span class="info-content with-top-hr-sep">{{
                  state.birthDateString
                }}</span>
              </div>
              <div v-if="state.phoneVisible" class="info">
                <span class="icon-button" :class="icons.pPhone"></span
                ><span class="info-content with-top-hr-sep">{{ state.phone }}</span>
              </div>
            </div>
          </div>
          <div v-else>
            <EmptyBox
              ><span class="!text-red-500 !text-2xl" :class="icons.pEyeSlash"></span>
              <h4>The contact is kept private</h4></EmptyBox
            >
          </div>
        </div>
      </SectionTitle>
      <SectionTitle :title="'II'" :topic="'hobbies and occupations'">
        <EmptyBox
          ><span class="!text-blue-500 !text-2xl" :class="icons.pWrench"></span>
          <h4>This section is under development</h4></EmptyBox
        >
      </SectionTitle>
      <SectionTitle :title="'III'" :topic="'skills'">
        <EmptyBox
          ><span class="!text-blue-500 !text-2xl" :class="icons.pWrench"></span>
          <h4>This section is under development</h4>
        </EmptyBox>
      </SectionTitle>

      <SectionTitle :title="'IV'" :topic="'experiences and projects'">
        <div v-if="!isVisitor">
          <UserExperienceListInfos :user-id="id">
          </UserExperienceListInfos>
        </div>
        <div v-else>
          <ExperienceBrowse :user-id="id"> </ExperienceBrowse>
        </div>
      </SectionTitle>
    </div>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped></style>
;
