<script lang="ts" setup>
import type { ProfessionDTO, SectorDTO, SectoredProfessionsDTO } from "~~/server/DB/DTOs";

const { sector } = defineProps<{ visible: boolean; sector: SectorDTO }>();
const emit = defineEmits(["close"]);
const professions = ref<ProfessionDTO[]>();
const selectedProfession = ref<ProfessionDTO | null>();

const loadDescription = (profession: ProfessionDTO) => {
  selectedProfession.value = profession;
};

const unLoadProfession = () => {
  selectedProfession.value = null;
};

const getSectorActivities = computed(() => {
  return professions.value;
});

const close = () => {
  emit("close");
};

onMounted(async () => {
  const data = await $fetch("/api/professions/" + sector.id);
  professions.value = data as any;
  console.log(professions.value);
});
</script>
<template>
  <Dialog
    :visible="visible"
    modal
    :header="`${sector.name} activities`"
    class="md:w-2xl min-h-lvh md:min-h-24 lg:w-4xl d-flex"
    :closable="true"
  >
    <template #closebutton>
      <div class="hidden md:block text-justify">
        <Button @click="close" class="icon-button" severity="secondary"
          ><span :class="icons.pTimes"></span
        ></Button>
      </div>
    </template>
    <template #default class="d-flex md:block">
      <span class="text-surface-500 dark:text-surface-400 block mb-8"> </span>
      <div class="d-flex flex-col min-h-full">
        <div class="col md:max-h-fit content relative">
          <div
            v-if="selectedProfession"
            class="description-overlay d-flex justify-center items-center"
            @click="unLoadProfession"
          >
            <div
              @click="$event.stopPropagation()"
              class="description md:max-w-1/2 max-h-fit card p-3"
            >
              <h3>{{ selectedProfession.name }}</h3>
              {{ selectedProfession.description }}
              <hr />
              <div class="d-flex justify-end">
                <Button severity="secondary" @click="unLoadProfession">ok</Button>
              </div>
            </div>
          </div>
          <div class="p-3 d-flex flex-wrap gap-3">
            <Button
              severity="secondary"
              class="max-h-fit p-3"
              v-for="profession in getSectorActivities"
              @click="loadDescription(profession)"
            >
              {{ profession.name }}
            </Button>
          </div>
        </div>
        <div class="col max-h-fit">
          <hr />
        </div>
        <div class="col max-h-fit">
          <div class="p-3 pt-0 block md:hidden">
            <div class="flex justify-start gap-2">
              <Button type="button" severity="secondary" @click="close"
                ><span :class="icons.pLeft"></span
              ></Button>
            </div>
          </div>
          <div class="p-3 pt-0 hidden md:block">
            <div class="flex justify-end gap-2">
              <Button type="button" label="Ok" @click="close"></Button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>
<style lang="scss">
.description-overlay {
  background-color: #000000aa;
}

.description-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.content {
  background: var(--odd-back-color);
}

.p-dialog-content {
  flex: 1;
  display: flex;
}
</style>
