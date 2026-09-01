<script setup lang="ts">
const getSectors = async () => {
  return await useFetch("/api/sectors", { lazy: true });
};
const { data: sectors, status, error } = await getSectors();

const roles = ref<string[]>();
const idAdmin = ref<string>();

onMounted(async () => {
  const user = await $fetch("/api/connexion/iam/");
  if (user != null) {
    roles.value = user.role;
    idAdmin.value = user.id;
  }
});

watch(sectors, () => {
  //showActivities(0);
});
</script>
<template>
  <div class="p-3">
    <h3>Edit sectors</h3>
    <div class="error" v-if="status === 'error'">{{ error?.statusMessage }}</div>
    <div v-else class="d-flex flex-wrap gap-3 max-w-fit justify-center">
      <SectorCard
        v-for="(sector, i) in sectors"
        :sector="sector"
        :i="i"
        class="justify-center border w-1/4"
      >
      </SectorCard>
    </div>
  </div>
</template>
