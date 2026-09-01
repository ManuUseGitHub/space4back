<script lang="ts" setup>
const hasError = computed(() => {
  return errors.value.length > 0;
});
const { isContained } = defineProps<{
  spine: string;
  icon?: string;
  isContained?: boolean;
}>();
const errors = ref([] as ValidationError[]);
const state = ref({
  showError: false,
  isLoading: false,
  timer: setTimeout(() => {}),
});

const changedField = (field: string) => {
  if (errors.value.find((x) => x.path[0] == field)) {
    errors.value = errors.value.filter((x) => x.path[0] != field);
  }
};

const validateRequiredField = () => {
  document.querySelectorAll("[role='field'][required]").forEach((x) => {
    const element = x as HTMLElement;
    const matchedField = element.dataset.field;
    const input = element.querySelectorAll("input");
    if (matchedField && input && !input[0]!.value) {
      const message = getLabel(matchedField).emptyError || "This field is required";
      validation({ path: [matchedField], message });
    }
  });
  return errors.value;
};

const currentErrors = computed(() => {
  return errors.value;
});
const validation = (event: ValidationError) => {
  const path = event.path[0];
  const index = errors.value.findIndex((x) => x.path[0] == path);

  if (index != -1) {
    errors.value[index] = event;
  } else {
    errors.value.push(event);
  }
};

const onError = (
  computedErrors: {
    path: string[];
    message: string;
  }[]
) => {
  errors.value = computedErrors;
};

const actionButtonAreaHeight = ref<string>();
const actionButtonArea = computed(() => {
  return actionButtonAreaHeight.value || 0;
});

const getWrapperClassNames = () => {
  return isContained?.valueOf()
    ? ""
    : "container col-xxl-10 col-md-11 p-0 m-0 px-md-2 py-md-5 m-md-auto";
};

onMounted(() => {
  setTimeout(() => {
    const element = document.getElementById("actionButtonArea");
    const height = element?.offsetWidth;
    if (element) actionButtonAreaHeight.value = `${height}px`;
    //validation({ path: ["reCaptcha"], message: "This field is required" });
  }, 500);
});
</script>
<template>
  <div class="w-full" :class="getWrapperClassNames()">
    <div class="relative">
      <ErrorPanel
        :errors
        :show-error="state.showError"
        @toggle="state.showError = $event"
      ></ErrorPanel>
      <div class="card">
        <div class="p-3" :class="hasError ? 'errored' : ''">
          <div class="flex-1 flex text-left gap-4 d-flex d-md-none items-center">
            <div>
              <a :href="'/home'">
                <img class="w-8" src="/img/luniversdemmlogotilt.png" />
              </a>
            </div>
            <h1 class="upside-title">{{ spine }}</h1>
            <span :class="icon || icons.pPenToSquare"></span>
          </div>
          <div class="p-0 upside-gradian-separator d-block d-md-none"></div>
          <div class="flex relative">
            <div class="col max-w-fit overflow-y-hidden pr-4 d-none d-md-block">
              <div class="flex flex-col h-full">
                <h1 class="sideway-title-icon">
                  <span :class="icon || icons.pPenToSquare"></span>
                </h1>
                <div class="flex flex-col grow items-center pb-3">
                  <h1 class="sideway-title flex-1 text-right text-nowrap">{{ spine }}</h1>
                  <div class="flex-1"></div>
                  <a :href="'/home'">
                    <img class="w-8" src="/img/luniversdemmlogotilt.png" />
                  </a>
                </div>
              </div>
            </div>
            <div class="p-0 gradian-separator d-none d-md-block"></div>
            <div class="col flex flex-col">
              <slot
                :hasError
                :errors="currentErrors"
                :prevalidate="validateRequiredField"
                @field="changedField"
                @validation="validation"
                @error="onError"
              ></slot>
              <div>
                <div class="absolute z-10 right-0" id="actionButtonArea">
                  <slot
                    name="actionButton"
                    :hasError
                    :invalidation="validation"
                    :prevalidate="validateRequiredField"
                    @error="onError"
                  ></slot>
                </div>
              </div>
              <div class="relative" :style="{ height: actionButtonArea }"></div>
            </div>

            <div class="col max-w-fit opacity-0 d-none d-md-block">
              <h1 class="sideway-title mr-4 flex-1 text-right">.</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="./style.scss" lang="scss"></style>
