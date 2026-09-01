<script lang="ts" setup>
import type { ExperienceDTO, UserWithExperiencesDTO } from "~~/server/DB/DTOs";
import { v, state } from "./script";
const emit = defineEmits(["patch", "swapup", "swapdown"]);
const experienceRef = ref();
const loadNewExperience = () => {
  v.loadNewExperience(experienceRef);
};
const props = defineProps<{
  rawData: UserWithExperiencesDTO;
}>();
const openExperience = (exp: ExperienceDTO) => {
  experienceRef.value.open(exp);
};

const experienceOrdered = computed(() => {
  return state.value!.experiences.sort((a, b) => a.order - b.order);
});
const onPatch = (event: any) => {
  emit("patch", event);
};

const slots = useSlots();
const hasSlot = (name: string) => {
  return !!slots[name];
};

v.setup(props.rawData);

defineExpose({ loadNewExperience });
</script>
<template>
  <div v-if="hasSlot('floatingActions')" id="floating-actions" class="container w-full">
    <slot name="floatingActions"></slot>
  </div>

  <div class="row" v-for="exp in experienceOrdered">
    <div class="col-12 justify-center">
      <ExperienceInfos :exp="exp" @patch="onPatch">
        <div class="d-flex gap-2 relative items-center">
          <div>
            <Button
              severity="primary"
              class="p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
              @click="$emit('swapup', exp)"
            >
              <span :class="icons.pUp"></span>
            </Button>
          </div>
          <div>
            <Button
              severity="primary"
              class="p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
              @click="$emit('swapdown', exp)"
            >
              <span :class="icons.pDown"></span>
            </Button>
          </div>
          <Metrics>
            <strong>{{ exp.project }}</strong>
          </Metrics>
          <ExperienceMetrics :exp="exp"></ExperienceMetrics>
          <div
            @click="openExperience(exp)"
            class="edit-button p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
          >
            <span :class="icons.pPencil"></span>
          </div>
        </div>
      </ExperienceInfos>
    </div>
  </div>
  <ExperienceModification ref="experienceRef"> </ExperienceModification>

  <div class="container w-full" v-if="hasSlot('actions')">
    <slot name="actions"></slot>
  </div>
  <h5 class="mb-6 text-center"></h5>
  <footer id="breahting" v-if="hasSlot('floatingActions')"></footer>
</template>
