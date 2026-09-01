<script setup lang="ts">
const props = defineProps<{
  icon?: string;
  errors: { path: string[]; message: string }[];
  field: string;
  label?: string;
  containerClass?: string;
  alternative?: boolean;
  poptip?: string;
  required?: boolean;
  iconButton?: boolean;
  severity?: string;
}>();
const emit = defineEmits(["validation", "toggle"]);
const hasError = () => {
  const { errors, field } = props;
  return errors.find((x) => x.path[0] == field);
};

const onValueChanged = (event: {
  meta: { field: string; value: any };
  cb: () => void;
}) => {
  const { meta, cb } = event;
  const { required } = props;

  if (/password|repeatPass/i.test(event.meta.field)) {
    event = JSON.parse(JSON.stringify(event));
    event.meta.value = `${event.meta.value}`.replaceAll(/./g, "*");
  }

  if (!required || meta.value) {
    if (cb) cb();
  } else if (required && !meta.value) {
    emit("validation", { path: [meta.field], message: "This field is required" });
  }
};
const getMessage = computed(() => {
  const { errors, field } = props;
  const error = errors.find((x) => x.path[0] == field);
  return error ? error.message : "";
});

const validityClass = computed(() => {
  return hasError() ? "invalid" : "";
});

const slots = useSlots();
const hasSlot = (name: string) => {
  return !!slots[name];
};

const pop = ref();
const togglePopTip = (event: any) => {
  pop.value.toggle(event);
};

const toggle = () => {
  emit("toggle");
};

const displayData = computed(() => {
  return getFieldDisplayData(props, props.field);
});
</script>
<template>
  <div :class="`${containerClass ? containerClass + ' ' : ''}relative ${validityClass}`">
    <div class="d-flex flex-1">
      <InputGroup>
        <Button
          v-if="iconButton"
          class="w-14! min-h-14"
          :severity="severity"
          @click="toggle()"
        >
          <span :class="displayData.icon"></span>
          <span v-if="required" class="required-mark">*</span>
        </Button>
        <InputGroupAddon v-else class="relative w-14 min-h-14">
          <span :class="displayData.icon"></span>
          <span v-if="required" class="required-mark">*</span>
        </InputGroupAddon>
        <slot name="addonleft" @value="onValueChanged"></slot>
        <slot name="before" @value="onValueChanged"></slot>
        <FloatLabel variant="on" role="field" :data-field="field" :required>
          <slot name="main" @value="onValueChanged"></slot>
          <slot @value="onValueChanged"></slot>
          <label :for="field">{{ displayData.label }}</label></FloatLabel
        >
        <slot name="addonright" @value="onValueChanged"></slot>
      </InputGroup>
      <template v-if="poptip != undefined || hasSlot('poptip')">
        <Button
          class="pl-2"
          @click="togglePopTip"
          :icon="icons.pQuestionCircle"
          unstyled
        ></Button>
        <Popover ref="pop">
          <slot name="poptip"></slot>
          {{ poptip }}
        </Popover>
      </template>
      <slot name="after"></slot>
    </div>

    <small severity="danger">{{ getMessage }}</small>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped></style>
