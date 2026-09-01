<script setup lang="ts">
import type { SectorDTO } from "~~/server/DB/DTOs";
import { getSectors, separators } from "./script";
const { data: sectors, status, error } = await getSectors();

const vignettes = [
  "inset-organic_farming-001.jpg",
  "443170434.jpg",
  "professor-leading-lecture-stockcake.webp",
  "Services-sector-770x433.avif",
  "people-g26a54dd1b_640.avif",
  "18962582.jpeg",
];

const roles = ref<string[]>();
const idAdmin = ref<string>();
const visibleActivities = ref(false);
const selectedSector = ref<SectorDTO|null>();

const showActivities = (i: number) => {
  selectedSector.value = (sectors.value as SectorDTO[])[i];
  visibleActivities.value = true;
};
const closeDialog = () => {
  visibleActivities.value = false;
  selectedSector.value = null;
} 

onMounted(async () => {
  const user = await $fetch("/api/connexion/iam/");
  if (user != null) {
    roles.value = user.role;
    idAdmin.value = user.id;
  }
});

watch(sectors,() => {
  //showActivities(0);
})

</script>
<template>
  <div>
    <article v-if="status === 'pending'" aria-busy="true"></article>
    <div class="error" v-else-if="status === 'error'">{{ error?.statusMessage }}</div>
    <div v-else>
      <article
        v-for="(sector, i) in sectors"
        class="mx-auto justify-center sector-article content"
        :class="separators[i]?.theme"
      >
        <div class="mz-sep mz-inherit in-down" :class="separators[i]?.styleBottom"></div>
        <div class="mz-sep mz-inherit in-top" :class="separators[i]?.styleTop"></div>
        <EvenThumbNail
          :sector="sector"
          :vignette="vignettes[i]!"
          :i="i"
          @show="showActivities($event)"
          v-if="i % 2 == 0"
        >
        </EvenThumbNail>
        <OddThumbNail
          :sector="sector"
          :vignette="vignettes[i]!"
          :i="i"
          @show="showActivities($event)"
          v-else
        ></OddThumbNail>
      </article>
    </div>
    <SectorProfessions @close="closeDialog"
      v-if="selectedSector"
      :sector="selectedSector"
      :visible="visibleActivities"
    ></SectorProfessions>
  </div>
</template>
<style lang="scss" src="./style.scss"></style>
