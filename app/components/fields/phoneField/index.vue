<script lang="ts" setup>
import { getLabelHinted } from "~/utils/common/misc";
import data from "../../../assets/json/phoneCodes.json";
import { validatePhone } from "./script";
const phoneCodes = data.data;

const { refreshFld, invalidate, phone, field } = defineProps<{
  phone: string;
  field: string;
  errors: ValidationError[];
  invalidate: ValidationCB;
  refreshFld: FieldCB;
  required?: boolean;
}>();

const emit = defineEmits(["phone", "validation", "code"]);

const state = ref<any>({
  selectedCode: { code: "BE", dial: "+32" },
  phone,
});

const phoneChanged = () => {
  onTheFlyValidate();
};

const onTheFlyValidate = () => {
  if (state.value.timer) {
    clearTimeout(state.value.timer);
  }

  setTimeout(() => {
    if (/^\+/.test(state.value.phone)) {
      const found = phoneCodes.find((x) =>
        new RegExp(`\\${x.dial}`).test(state.value.phone)
      );
      if (found) {
        state.value.selectedCode = found;
      }
      const dialP = new RegExp(`\\${found?.dial || state.value.selectedCode.dial}`);
      if (dialP.test(state.value.phone)) {
        state.value.phone = state.value.phone.replace(dialP, "0");
      }
    }
    if (/^[0]{2,}/.test(state.value.phone)) {
      state.value.phone = state.value.phone.replace(/0{2,}/, "0");
    }
  }, 200);

  state.value.timer = setTimeout(() => {
    const { success, message } = validatePhone(state.value.phone);

    if (state.value.phone) {
      if (!success) {
        invalidate({ path: [field], message });
      } else {
        refreshFld("phone");
        emit("phone", { field, value: state.value.phone });
      }
    }
  }, 1000);
};

onMounted(() => {
  emit("code", state.value.selectedCode);
});

const phoneExamples = [
  "0123456789",
  "0 123 / 45 . 67 . 89",
  "01.23.45.67.89",
  "01-23-45-67-89",
  "01/23/45/67/89",
  "0(123)456789",
  "...",
];
</script>
<template>
  <FieldChecked
    :container-class="'col-xl-6'"
    :errors="errors"
    :field="field"
    :label="getLabelHinted(field)"
    :icon="icons.pPhone"
    :required
    v-on:validation="$emit('validation', $event)"
  >
    <template #addonleft>
      <slot name="addonleft"></slot>
      <InputGroupAddon class="phone-addon">
        <Select
          inputId="phoneIndicative"
          v-model="state.selectedCode"
          :options="phoneCodes"
          optionLabel="name"
          placeholder="Select a country"
          @value-change="
            $emit('code', state.selectedCode);
            onTheFlyValidate();
          "
          filter
          class="phone-select"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center pr-8">
              <span
                class="min-w-6"
                :class="`fi fi-${slotProps.value.code.toLowerCase()}`"
              ></span
              >&nbsp;
              <span>{{ slotProps.value.dial }}</span>
            </div>
            <span v-else>Select a country</span>
          </template>

          <template #option="slotProps">
            <div class="flex items-center gap-2">
              <span :class="`fi fi-${slotProps.option.code.toLowerCase()}`"></span>
              <span>{{ slotProps.option.dial }}</span>
              <span>{{ slotProps.option.name }}</span>
            </div>
          </template>
        </Select>
      </InputGroupAddon>
    </template>
    <template #main="{ onValue }"
      ><InputText
        @value-change="onValue({ meta: { field, value: state.phone }, cb: phoneChanged })"
        type="tel"
        v-model="state.phone"
    /></template>
    <template #poptip>
      Here are few accepted formats<br />
      <ul>
        <li v-for="num in phoneExamples">{{ num }}</li>
      </ul>
    </template>
  </FieldChecked>
</template>
