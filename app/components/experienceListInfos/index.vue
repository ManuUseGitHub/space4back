<script lang="ts" setup>
import type {
  ExperienceDTO,
  ExperiencesToPatch,
  UserWithExperiencesDTO,
} from "~~/server/DB/DTOs";
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
v.setup(props.rawData);

defineExpose({ loadNewExperience });
</script>
<template>
  <div id="floating-actions" class="container w-full">
    <slot name="floatingActions"></slot>
  </div>
  <h5 class="mb-6 text-center"></h5>
  <div class="row gap-3">
    <div class="col-12">
      <div class="col-12 my-3">
        <div class="rounded p-2">
          <NuxtLink class="btn btn-primary" :to="'/u/' + rawData.userId">
            <span class="icon-button" :class="icons.pLeft"></span><span> My profile</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  <div class="row" v-for="(exp, index) in experienceOrdered">
    <div class="col-12 justify-center">
      <ExperienceInfos :exp="exp" @patch="onPatch">
        <div class="d-flex gap-2 relative">
          <Button :class="icons.pUp" @click="$emit('swapup', exp)"> </Button
          ><Button :class="icons.pDown" @click="$emit('swapdown', exp)"> </Button>
          <h5>{{ exp.project }}</h5>
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
  <footer id="breahting"></footer>
</template>
<style src="./style.scss" lang="scss" scoped></style>
