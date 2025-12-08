<script lang="ts" setup>
import { getLabelHinted } from '~/utils/common/misc';

const FIELD = "password";

const { refreshFld, invalidate } = defineProps<{
  errors: ValidationError[];
  invalidate: ValidationCB;
  refreshFld?: FieldCB;
}>();

const emit = defineEmits([FIELD, "validation", "value"]);

const state = ref({
  password: "",
  repeatPass: "",
  timer: setTimeout(() => {}),
  repeatPassTimer: setTimeout(() => {}),
});

const changedRepeatPass = (threshold = 1000) => {
  const repeatField = "repeatPass";
  if (state.value.repeatPassTimer) {
    clearTimeout(state.value.repeatPassTimer);
  }

  state.value.repeatPassTimer = setTimeout(() => {
    if (state.value.password != state.value.repeatPass) {
      emit("validation", { path: [repeatField], message: "The password should match" });
    } else {
      emit(FIELD, { field: "repeatPass", value: state.value.repeatPass });
    }
  }, threshold);
};

const onPassword = () => {
  changedRepeatPass(3000);
  runPasswordValidation(invalidate, refreshFld!, state.value);
};
</script>
<template>
  <FieldChecked
    :container-class="'col-md-6'"
    :errors
    :field="FIELD"
    :label="getLabelHinted(FIELD)"
    :icon="icons.pAsterisk"
    :poptip="'The passwords should contain digits, capitals, and special characters'"
    v-on:validation="$emit('validation', $event)"
    required
  >
    <template #default="{ onValue }">
      <Password
        @value-change="$emit(FIELD, { field: FIELD, value: state.password })"
        v-model="state.password"
        v-on:keyup="
          onValue({ meta: { field: FIELD, value: state.password }, cb: onPassword })
        "
        toggleMask
      />
    </template>
  </FieldChecked>
  <FieldChecked
    :container-class="'col-md-6'"
    :errors
    :field="'repeatPass'"
    :label="getLabelHinted('repeatPass')"
    :icon="icons.pAsterisk"
    v-on:validation="$emit('validation', $event)"
    required
  >
    <template #default="{ onValue }">
      <Password
        @value-change="$emit(FIELD, { field: 'repeatPass', value: state.repeatPass })"
        v-model="state.repeatPass"
        v-on:keyup="
          onValue({
            meta: { field: 'repeatPass', value: state.password },
            cb: changedRepeatPass,
          })
        "
        toggleMask
      />
    </template>
  </FieldChecked>
</template>
