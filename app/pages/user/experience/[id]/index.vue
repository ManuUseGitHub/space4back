<script setup lang="ts">
import "primeicons/primeicons.css";
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { compose, v } from "./script";
import type { UserWithExperiencesDTO } from "~~/server/DB/DTOs";

const route = useRoute();
const id = route.params.id;
const data: any = await $fetch("/api/experiences/" + id);
const rawData = parseDates(data) as UserWithExperiencesDTO;
const toast = useToast();

const experienceRef = ref();
const isPatchListIIsFilled = computed(() => {
  return compose.value.patchL.length != 0;
});

v.setup(rawData);
</script>
<template>
  <div
    id="banner"
    class="justify-items-center content-end flex-col mb-3 h-72 p-2 relative"
  >
    <ProfilePicture :editable="false"></ProfilePicture>
    <BannerPicture :editable="false"></BannerPicture>
  </div>
  <div class="container">
    <MegaHeaderPresentation
      :title-space="'professional experiences'"
      :space="' IV'"
    ></MegaHeaderPresentation>
    <div class="row">
      <div class="col-md-12 relative info-pane">
        <ExperienceListInfos
          ref="experienceRef"
          @patch="v.onPatch"
          @swapup="v.onSwapUp"
          @swapdown="v.onSwapDown"
          :raw-data="rawData"
        >
          <template v-slot:floatingActions>
            <div class="d-flex gap-3 justify-center p-3">
              <Button
                v-if="isPatchListIIsFilled"
                class="p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
              >
                <div :class="icons.pSave" @click="v.applyPatches()"></div>
              </Button>
              <Button
                class="p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
              >
                <div
                  :class="icons.pPlus"
                  @click="experienceRef.loadNewExperience()"
                ></div>
              </Button>
            </div>
          </template>
          <template v-slot:addButton> </template>
        </ExperienceListInfos>
      </div>
    </div>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped></style>
