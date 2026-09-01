<script setup lang="ts">
import type { SectorDTO } from "~~/server/DB/DTOs";

defineProps<{
  sector: SectorDTO;
  i: number;
}>();
</script>
<template>
  <div class="justify-center border w-1/4 p-3 d-flex flex-col card">
      <div class="col">
        <div>
          <h2 class="float-left sector max-w-min p-2 border mr-2">{{ sector.name }}</h2>
          <h4 class="inline">{{ sector.description }}</h4>
        </div>
        <p>{{ sector.comment }}</p>
      </div>
      <div class="col flex-1" />
      <div class="col">
        <hr />
        <NuxtLink :to="`/manage/skills/${1 + i}`">
          <Button severity="secondary" class="icon-button"
            ><span :class="icons.pPencil"></span
          ></Button>
        </NuxtLink>
      </div>
    </div>
</template>
