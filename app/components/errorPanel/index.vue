<script setup lang="ts">
import { firstString } from '~/utils/common/arrays';
import { getLabelSimple } from '~/utils/common/misc';


const props = defineProps<{
  showError: boolean;
  errors: { path: string[]; message: string }[];
}>();
const emit = defineEmits(["toggle"]);

const toggled = (collapsed: any) => {
  const { value } = collapsed;
  emit("toggle", !value);
};
const hasError = computed(() => {
  return props.errors.length > 0;
});

onMounted(() => {
  const element = document.getElementById("errorOverlay");
  const minWidth = element?.offsetWidth;
  if (element) element.style.width = `${minWidth}px`;
});
</script>

<template>
  <Panel
    header=" "
    id="errorOverlay"
    class="absolute z-10 right-0"
    :class="showError ? 'expended' : ''"
    :collapsed="!showError"
    toggleable
    severity="danger"
    @toggle="toggled"
  >
    <template #togglebutton="{ collapsed, toggleCallback }">
      <Button
        v-if="hasError"
        class="toggleErrorButton"
        severity="secondary"
        rounded
        @click="toggleCallback"
        :icon="collapsed ? icons.pExclamationCircle : icons.pTimes"
      ></Button
      ><Button
        v-else
        rounded
        :icon="collapsed ? icons.pExclamationCircle : icons.pTimes"
        class="opacity-0"
      ></Button>
    </template>
    <h1>Signup errors ({{ errors.length }})</h1>
    <hr />
    <div class="row row-gap-3">
      <div v-for="error in errors" class="col-md-6 col-xl-6 col-xxl-4 flex error-item">
        <InputGroup class="w-full">
          <InputGroupAddon>
            <span :class="getLabelSimple(firstString(error.path)).icon"></span>
          </InputGroupAddon>
          <InputGroupAddon class="col">
            <div class="flex flex-col">
              <h5 class="text-left">
                {{ getLabelSimple(firstString(error.path)).label }}
              </h5>
              <p>{{ error.message }}</p>
            </div>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  </Panel>
</template>
