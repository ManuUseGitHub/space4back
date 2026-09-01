<script lang="ts" setup>
import type { ExperienceDTO } from "~~/server/DB/DTOs";
import { v, type Category } from "./script";
const { exp,experiences } = defineProps<{ exp: ExperienceDTO, experiences:ExperienceDTO[] }>();

const tasks = ref<Category[]>([])
const others = ref<Category[]>([])
const tabNames = ref<string[]>([])

const emit = defineEmits(["pick",'next','previous'])
const previousIndex = ref(-1)
const nextIndex = ref(-1)

const setIndexes = () => {
  const i = experiences.findIndex(e => e.id === exp.id)

  previousIndex.value = i > 0 ? i - 1 : -1
  nextIndex.value = i < experiences.length - 1 ? i + 1 : -1
}

const pickPrevious = () => {
  if (previousIndex.value === -1) return
  emit("pick", experiences[previousIndex.value])
}

const pickNext = () => {
  if (nextIndex.value === -1) return
  emit("pick", experiences[nextIndex.value])
}

/* Recalculate whenever the selected experience changes */
watch(
  () => exp.id,
  () => {
    others.value = []
    tabNames.value = []
    tasks.value = []
  const lovs = v.getCollectedLovs(exp).sort((a, b) => {
    return a.order - b.order;
  });

  lovs.forEach((l,i) => {
    if(l.cat.value == "tasks"){
      tasks.value.push(l)
    }
    else{
      tabNames.value.push(l.cat.value)
      others.value.push(l)
    }
  })
    setIndexes()
  },
  { immediate: true }
)
onMounted(() => {


  setIndexes()
})
</script>
<template>
  <div class="relative rounded mb-3 p-3 border">
    <div class="py-0">
      <div class="flex w-full">
        <div class="col-3 card">
          <div class="row p-3">
            <div class="col d-flex">
              <div class="px-3">
                <h6>
                  <span :class="icons.pCalendar"></span>
                  {{
                    `${exp.monthStart} / ${exp.yearStart} - ${exp.monthEnd} /
              ${exp.yearEnd}`
                  }}
                </h6>
                <h6>Employer : {{ exp.employer }}</h6>
                <h6>Client : {{ exp.client }}</h6>
                <h6>As : {{ exp.title }}</h6>
                <h6 class="my-0">Role : {{ exp.role }}</h6>
              </div>
            </div>
            <div class="col-12">
              <hr />
              <div class="d-flex justify-center p-3 gap-3 items-center">
                <Button
                  severity="primary"
                  @click="pickPrevious"
                  v-if="previousIndex != -1"
                >
                  Prev. <span :class="icons.pLeft"></span>
                </Button>
                <Button v-else disabled severity="secondary">
                  Prev. <span :class="icons.pLeft"></span>
                </Button>
                <Button
                  severity="primary"
                  @click="emit('pick', null)"
                  class="p-button p-component btn-primary"
                >
                  Overview
                </Button>
                <Button severity="primary" @click="pickNext" v-if="nextIndex != -1">
                  <span :class="icons.pRight"></span> Next
                </Button>
                <Button v-else disabled severity="secondary">
                  <span :class="icons.pRight"></span>Next.
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row p-3">
            <div class="col-12">
              <h4>{{ exp.project }}</h4>
              <p>{{ exp.description }}</p>
            </div>

            <div class="col-12" v-for="lov in tasks">
              <h6>{{ lov.value }}</h6>
              <ul class="list-none">
                <li v-for="item in v.filterItemsFromLov(exp.lov, lov.cat)">
                  <span class="color-primary" :class="icons.pChevronCircleRight"></span>
                  {{ item.value }}
                </li>
              </ul>
            </div>
            <div class="col-12">
              <Tabs :value="0">
                <TabList>
                  <Tab v-for="(name, i) in tabNames" :value="i">{{ name }}</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel v-for="(lov, i) in others" :value="i">
                    <div class="container d-flex flex-wrap gap-2">
                      <span
                        class="key-word p-1 border rounded min-w-fit"
                        v-for="item in v.filterItemsFromLov(exp.lov, lov)"
                      >
                        {{ item.value }}
                      </span>
                    </div>
                  </TabPanel>
                </TabPanels></Tabs
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
