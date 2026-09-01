<script lang="ts" setup>
import { v } from "./script";

const props = defineProps<{
  state: StateModifyExperience;
  errors: {
    path: string[];
    message: string;
  }[];
  onValidation: (event: globalThis.ValidationError) => void;
}>();

defineExpose({ addSection: v.addSection });

const getCategoriesOrdered = computed(() =>
  v.getCategoriesOrdered(props.state.categories)
);
</script>
<template>
  <div class="dialog-content">
    <div v-for="(section, index) in getCategoriesOrdered">
      <br />
      <Panel toggleable collapsed>
        <template #toggleicon="{ collapsed }">
          <span :class="`${collapsed ? icons.pEyeSlash : icons.pEye} ${collapsed?'':'text-blue-600!'}`"></span>
        </template>
        <template #header>
          <FieldChecked
            class="w-full"
            :errors="errors"
            :field="'categories'"
            @validation="onValidation"
            severity="secondary"
            @toggle="v.toggleStyle(section)"
            :icon="v.getIconOfCategory(section)"
            :icon-button="index > 0"
            required
          >
            <template #default>
              <InputText
                :id="`sec-${section.order}`"
                v-on:change="v.updateLovCategory(state.lov, section)"
                name="section"
                type="text"
                v-model="section.value"
                :placeholder="`sec-${section.order}`"
              />
            </template>
            <template #addonleft v-if="index > 0">
              <Button
                class="min-w-14"
                severity="secondary"
                :class="icons.pUp"
                :disabled="index == 1"
                @click="v.pushUp(state, section)"
              ></Button>
            </template>
            <template #before v-if="index > 0">
              <Button
                class="min-w-14"
                severity="secondary"
                @click="v.pushDown(state, section)"
                :disabled="index == state.categories.length - 1"
                :class="icons.pDown"
              ></Button>
              <Button
                severity="secondary"
                @click="v.deleteSection(state, section)"
                :class="icons.pTrash"
              ></Button>
            </template>
          </FieldChecked>
        </template>
        <div class="input-group-vertical rounded mt-3 pb-3">
          <div class="form-group d-flex flex-col">
            <InputGroup v-for="(lov, index) in v.filterItemsFromLov(state.lov, section)">
              <InputText
                :id="`sec-${index + 1}`"
                class="mb-0 py-0 list-input w-full"
                name="role"
                type="text"
                v-model="lov.value"
                :placeholder="`...`"
              />
              <InputGroupAddon>
                <Button
                  severity="danger"
                  @click="v.removeLov(state.lov, section, lov)"
                  :class="icons.pTrash"
                ></Button>
              </InputGroupAddon>
            </InputGroup>

            <div class="d-flex justify-center p-3">
              <Button
                severity="secondary"
                @click="v.addLovTo(state.lov, section)"
                class="p-button-rounded p-button-icon-only"
              >
                <span :class="icons.pPlus"></span>
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </div>

    <div class="my-3 p-3 gap-3 d-flex split-background" v-if="getCategoriesOrdered.length < 10">
      <Button
        severity="primary"
        @click="v.addSection(state, SECTION_STYLE.LIST)"
      >
        New list <span :class="icons.pList"></span>
      </Button>
      <Button
        severity="primary"
        @click="v.addSection(state, SECTION_STYLE.LIST)"
      >
        New keywords <span :class="icons.pkey"></span>
      </Button>
    </div>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped/>
