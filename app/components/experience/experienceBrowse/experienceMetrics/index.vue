<script lang="ts" setup>
import type { ExperienceDTO } from "~~/server/DB/DTOs";

const { exp } = defineProps<{ exp: ExperienceDTO }>();

const tasks = ref<any[]>([]);
const keyValues = ref<any[]>([]);

exp.lov.forEach((l) => {
  if (l.category == "tasks") {
    tasks.value.push(...l.items);
    console.log(l.items);
  } else {
    keyValues.value.push(...l.items);
  }
});
</script>
<template>
  <Metrics>
    <span v-if="tasks.length" class="dodgerblue" :class="icons.pClipboard"></span>
    <span v-else class="salmon" :class="icons.pClipboard"></span> 
    <span :class="!tasks.length ? 'salmon' : ''">{{ tasks.length }}</span>

    <span v-if="keyValues.length" :class="icons.pKey" class="goldenrod"></span>
    <span v-else :class="icons.pKey" class="salmon"></span>
    <span :class="!keyValues.length ? 'salmon' : ''">{{ keyValues.length }}</span>
  </Metrics>
</template>
<style>
.goldenrod {
  color: goldenrod !important;
}
.dodgerblue {
  color: dodgerblue !important;
}
.salmon {
  color: salmon !important;
}
</style>
