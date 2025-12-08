<script lang="ts" setup>
import type { ExperienceDTO } from "~~/server/DB/DTOs";
import { v } from "./script";
import { generateHash } from "~~/server/utils/common/hash";
const { exp } = defineProps<{ exp: ExperienceDTO }>();

const getCategoriesOrdered = computed(() => {
  return v.getCollectedLovs(exp).sort((a, b) => {
    return a.order - b.order;
  });
});

const preparePatch = (exp: ExperienceDTO) => {
  const { id, order, favorite } = exp;
  const hash = generateHash({ id, order, favorite });
  return { hash, data: { id, order, favorite } };
};
</script>
<template>
  <div class="relative rounded mb-3">
    <Panel class="py-0" :class="v.favoritedClass(exp)" toggleable collapsed>
      <template #header>
        <div class="flex-col w-full">
          <div class="w-full">
            <slot></slot>
          </div>
        </div>
      </template>
      <template #toggleicon="{ collapsed }">
        <span :class="collapsed ? icons.pEye : icons.pEyeSlash"></span>
      </template>
      <div class="row">
        <div class="col d-flex">
          <div class="d-flex flex-col justify-center">
            <div
              class="favorite-button mb-0 p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
              @mousedown="$emit('patch', preparePatch(exp))"
              @mouseup="
                v.onFavorite(exp);
                $emit('patch', preparePatch(exp));
              "
            >
              <span :class="exp.favorite ? icons.pStarFill : icons.pStar"></span>
            </div>
          </div>
          <div class="px-3">
            <h6>
              <span :class="icons.pCalendar"></span>
              {{
                `${exp.monthStart} / ${exp.yearStart} - ${exp.monthEnd} /
              ${exp.yearEnd}`
              }}
            </h6>
            <h6>Employer : {{ exp.employer }}</h6>
            <h6>Client : {{ exp.client }}</h6>
            <h6>As : {{ exp.title }}</h6>
            <h6 class="my-0">Role : {{ exp.role }}</h6>
          </div>
          <div class="d-flex flex-1 flex-col items-center justify-center">
            <div
              class="border rounded flex-1 w-full d-flex flex-col items-center justify-center"
            >
              <p class="m-0">{{ exp.description }}</p>
            </div>
          </div>
        </div>
        <div class="col-12">
          <hr />
        </div>
      </div>
      <div class="row py-3">
        <div class="col-6" v-for="lov in getCategoriesOrdered">
          <h6>{{ lov.value }}</h6>
          <ul v-if="lov.style == 'list'" class="list-none">
            <li v-for="item in v.filterItemsFromLov(exp.lov, lov.cat)">
              <span class="color-primary" :class="icons.pChevronCircleRight"></span>
              {{ item.value }}
            </li>
          </ul>
          <div v-else-if="lov.style == 'keys'" class="">
            <div class="container d-flex flex-wrap gap-2">
              <span
                class="key-word p-1 border rounded min-w-fit"
                v-for="item in v.filterItemsFromLov(exp.lov, lov)"
              >
                {{ item.value }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-sm-5"></div>
      </div>
    </Panel>
  </div>
</template>
<style src="./style.scss"></style>
