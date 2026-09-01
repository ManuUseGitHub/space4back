<script setup lang="ts">
import "primeicons/primeicons.css";
import { ref, computed } from "vue";
import { compose, v } from "./script";
import type { UserWithExperiencesDTO } from "~~/server/DB/DTOs";
import { Button } from "primevue";

const { userId } = defineProps<{ userId: string }>();
const data: any = await $fetch("/api/experiences/" + userId);
const rawData = parseDates(data) as UserWithExperiencesDTO;

const experienceRef = ref();
const isPatchListIIsFilled = computed(() => {
  return compose.value.patchL.length != 0;
});

v.setup(rawData);
</script>
<template>
  <div class="row">
    <div class="col-md-12 relative">
      <ExperienceListInfos
        ref="experienceRef"
        @patch="v.onPatch"
        @swapup="v.onSwapUp"
        @swapdown="v.onSwapDown"
        :raw-data="rawData"
      >
        <template v-slot:actions>
          <div class="gap-3 d-flex justify-center p-3 w-full">
            <Button
              v-if="isPatchListIIsFilled"
              severity="primary"
              class="p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
            >
              <span :class="icons.pSave" @click="v.applyPatches()"></span>
            </Button>
            <Button
            severity="primary"
              class="p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
            >
            
              <span :class="icons.pPlus" @click="experienceRef.loadNewExperience()"></span>
            </Button>
          </div>
        </template>
        <template v-slot:addButton> </template>
      </ExperienceListInfos>
    </div>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped></style>
