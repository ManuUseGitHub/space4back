<script lang="ts" setup>
import type { UserPreferencesDTO } from "~~/server/DB/DTOs";
import { ageFromDate } from "~~/server/utils/common/dateCalculation";

const props = defineProps<{
  rawPreferences: UserPreferencesDTO;
  birthDate: string;
}>();
const userData = props.rawPreferences;

const state = ref({
  ...userData,
  birthDateString: transformDate(props.birthDate),
});
const route = useRoute();
const { asVisitor } = route.query;

const id = route.params.id as string;

const isSame = ref<Boolean>();
onMounted(async () => {
  isSame.value = await $fetch("/api/connexion/same", { method: "post", body: { id } });
});

const ageInfos = computed(() => {
  return state.value.birthDate ? `${ageFromDate(state.value.birthDate)} years old |` : "";
});
</script>
<template>
  <div class="d-flex flex-1">
    <slot></slot>
    <div class="gap-3 flex-1">
      <div class="d-flex gap-3 border">
        <div class="col max-w-fit">
          <div class="p-2">
            <h3 class="min-w-fit">{{ state.firstName }} {{ state.lastName }}</h3>
            <p>
              {{ state.title }} <span :class="icons.pAt" /> {{ state.enterprise }} |
              {{ ageInfos }}
              <span :class="getGender(state.gender)"></span>
            </p>
          </div>
        </div>
        <div class="col content-center split-background rounded">
          <div class="d-flex justify-center">
            <template v-if="isSame">
              <Button
                v-if="asVisitor"
                severity="primary"
                class="border btn justify-center bg-transparent"
                @click="
                  () => {
                    reloadNuxtApp({ path: '/u/' + userData.id + '#', force: true });
                  }
                "
              >
                <span :class="icons.pSignOut"></span>&nbsp;<span>Quit view as mode</span>
              </Button>
              <Button
                v-else
                severity="primary"
                class="border btn justify-center bg-transparent"
                @click="
                  () => {
                    reloadNuxtApp({ path: '/u/' + userData.id + '?asVisitor=true' });
                  }
                "
              >
                <span :class="icons.pRefresh"></span>&nbsp;<span>View as</span>
              </Button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped></style>
