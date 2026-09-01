<script lang="ts" setup>
import type { ExperienceDTO } from "~~/server/DB/DTOs";
import { v, state } from "./script";
const emit = defineEmits(["patch", "swapup", "swapdown"]);
const experienceRef = ref();
const loadNewExperience = () => {
  v.loadNewExperience(experienceRef);
};

const { userId, isSame = false } = defineProps<{
  isSame?: boolean
  userId: string;
}>();
const data: any = await $fetch("/api/experiences/" + userId);

const top3 = ref<ExperienceDTO[]>([]);

const experienceOrdered = computed(() => {
  return state.value!.experiences.sort((a, b) => a.order - b.order);
});
const project = ref<ExperienceDTO | null>(null);
const setProject = (exp: ExperienceDTO | null) => {
  project.value = exp;
};

onMounted(() => {
  experienceOrdered.value.forEach((p, i) => {
    if (i < 3) {
      top3.value.push(p);
    }
  });
});

v.setup(data);

defineExpose({ loadNewExperience });
</script>
<template>
  <div
    v-if="!experienceOrdered.length"
    class="col d-flex justify-content-center items-center"
  >
    <EmptyBox></EmptyBox>
  </div>
  <div v-else class="d-flex">
    <div v-if="!project" class="col max-w-fit">
      <h3>Last 3</h3>

      <ul class="list-none mx-3 max-w-min">
        <li v-for="(exp) in top3" class="d-flex mb-2">
          <Button
            class="flex-1 justify-content-start project-item border"
            @click="setProject(exp)"
          >
            <div class="text-left d-flex items-center">
              <div class="col">
                <p>
                  <span :class="icons.pCalendar"></span>
                  {{
                    `${exp.monthStart} / ${exp.yearStart} - ${exp.monthEnd} /
              ${exp.yearEnd}`
                  }}
                </p>
                <h4 class="min-w-max">{{ exp.project }}</h4>
                {{ exp.description }}
              </div>
              <div class="col max-w-fit ml-3">
                <div
                  class="p-button p-component p-button-rounded p-button-icon-only border"
                >
                  <div :class="icons.pRight"></div>
                </div>
              </div>
            </div>
          </Button>
        </li>
      </ul>
    </div>
    <div class="col min-50vh">
      <VisitorExperienceInfos
        v-if="project"
        :exp="project"
        :experiences="experienceOrdered"
        @pick="setProject"
      >
        <h5>{{ project }}</h5>
      </VisitorExperienceInfos>
      <div v-else>
        <h3>Overview</h3>
        <ul class="list-none mx-3">
          <li v-for="exp in experienceOrdered" class="d-flex mb-2">
            <Button
              class="flex-1 justify-content-start project-item border"
              @click="setProject(exp)"
            >
              <div class="text-left gap-1 d-flex items-center">
                <Metrics>
                  <small >
                    <span :class="icons.pCalendar" class="!text-purple-600"></span>
                    {{
                      `${exp.monthStart} / ${exp.yearStart} - ${exp.monthEnd} /
              ${exp.yearEnd}`
                    }}
                  </small>
                </Metrics>
                <Metrics>
                  <strong>{{ exp.project }}</strong>
                </Metrics>
                <ExperienceMetrics :exp="exp"></ExperienceMetrics>
              </div>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped></style>
