<script lang="ts" setup>
import type { UserPreferencesDTO } from "~~/server/DB/DTOs";
import { getGender } from "./script";
import { ageFromDate } from "~~/server/utils/common/dateCalculation";

const props = defineProps<{ rawPreferences: UserPreferencesDTO; birthDate: string }>();
const userData = props.rawPreferences;


const state = ref({
  ...userData,
  birthDateString: transformDate(props.birthDate),
});

const ageInfos = computed(() => {
  return state.value.birthDate ? `${ ageFromDate(state.value.birthDate) } years old |` : ""
})

</script>
<template>
  <div class="container d-flex">
    <slot></slot>
    <div class="row gap-3">
      <div class="col-sm-12">
        <div class="p-2">
          <h3>{{ state.firstName }} {{ state.lastName }}</h3>
          <p>
            {{ state.title }} <span :class="icons.pAt" /> {{ state.enterprise }} |
            {{ ageInfos }}
            <span :class="getGender(state.gender)"></span>
          </p>
        </div>
      </div>
      <div class="col-12">
        <div class="d-flex">
          <div class="row">
            <div class="col-12">
              <h5 class="pt-2 px-3">Me and my goal?</h5>
            </div>
            <div class="col-4">
              <p class="p-2">{{ state.professionalGoal }}</p>
            </div>
            <div class="col">
              <p class="p-2 with-left-hr-sep">{{ state.introduction }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="p-2">
          <NuxtLink class="btn btn-primary" :to="'/uexp/' + userData.id">
            <span class="icon-button" :class="icons.pBriefcase"></span
            ><span> My Experiences</span>
          </NuxtLink>
        </div>
      </div>
      <div class="col-12">
        <div class="contact-info">
          <h5 class="pt-2 px-3">Contacting me?</h5>
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
      </div>
    </div>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped></style>
;
