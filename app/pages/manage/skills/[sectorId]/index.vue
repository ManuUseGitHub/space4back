<script setup lang="ts">
import type { ProfessionDTO, SectorDTO } from "~~/server/DB/DTOs";

const route = useRoute();
const sectorId = route.params.sectorId as string;
const sector: SectorDTO = await $fetch("/api/sectors/" + sectorId);
sector.professions = sector.professions.sort((a: ProfessionDTO, b: ProfessionDTO) =>
  a.name < b.name ? -1 : 1
);

const roles = ref<string[]>();
const idAdmin = ref<string>();

onMounted(async () => {
  const user = await $fetch("/api/connexion/iam/");
  if (user != null) {
    roles.value = user.role;
    idAdmin.value = user.id;
  }
});

const pickProfession = (id: number) => {
  selectedProfession.value = sector.professions.find((p) => p.id == id);
};

const selectedProfession = ref<ProfessionDTO>();
</script>
<template>
  <div class="p-3 d-flex flex-col card">
    <h2 class="">Edit {{ sector.name }}</h2>
    <div class="d-flex flex-1">
      <div class="col d-flex flex-col md:max-w-md">
        <h5>Sector info</h5>
        <p class="inline">{{ sector.description }}</p>
        <hr />
        <h5>insights</h5>
        <div class="d-flex">
          <Metrics>{{ sector.professions.length }} professions</Metrics>
        </div>
        <hr />
        <div class="d-flex flex-wrap gap-1 flex-1 max-h-1/2!">
          <Button
            :severity="profession.id != selectedProfession?.id ? 'secondary' : 'primary'"
            @click="pickProfession(profession.id)"
            v-for="profession in sector.professions"
            >{{ profession.name }}</Button
          >
        </div>
      </div>
      <div class="col max-w-fit v-hr m-2 min-h-full"></div>
      <div class="col">
        <div class="d-flex flex-wrap gap-3">
          <Select
            v-model="selectedProfession"
            :options="sector.professions"
            optionLabel="name"
            placeholder="Select a profession"
            class="w-full md:w-56"
          >
            <template #option="slotProps">
              {{ slotProps.option.name }}
            </template>
          </Select>
          <div v-if="selectedProfession">
            <p>{{ selectedProfession.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
