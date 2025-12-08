<script setup lang="ts">
import { compose, state, v } from "./script";

const toast = useToast();
const getCategoriesOrdered = computed(() => v.getCategoriesOrdered());
const { open } = v;

defineExpose({ open });
</script>
<template>
  <Dialog
    v-model:visible="state.visible"
    modal
    :header="compose.mode == 'edit' ? 'Edit experience' : 'New experience'"
    class="w-fit m-5"
  >
    <form @submit.prevent="v.onSubmit(toast)">
      <div class="row">
        <div class="col-sm-6">
          <label for="employer">Employer</label>
          <InputText
            class="mb-1"
            name="employer"
            id="employer"
            type="text"
            v-model="state.employer"
            :placeholder="'Employer'"
            @change="v.updateClient()"
          />

          <div class="flex items-center gap-2 mb-3">
            <Checkbox
              @change="v.sameForClientChanged(toast)"
              inputId="sameForClient"
              v-model="compose.sameForClient"
              binary
            />
            <label for="sameForClient" class="mb-0"> Same as client </label>
          </div>
          <template v-if="!compose.sameForClient">
            <label for="client">client</label>
            <InputText
              id="client"
              name="client"
              type="text"
              v-model="state.client"
              :placeholder="'Client'"
            />
          </template>
        </div>
        <div class="col-sm-6">
          <label for="title">Title</label>
          <InputText
            class="mb-1"
            id="title"
            name="title"
            type="text"
            v-model="state.title"
            :placeholder="'My title as a worker'"
            @change="v.updateRole()"
          />
          <div class="flex items-center gap-2 mb-3">
            <Checkbox
              @change="v.sameForRoleChanged(toast)"
              inputId="sameForRole"
              v-model="compose.sameForRole"
              binary
            />
            <label for="sameForRole" class="mb-0"> Same as role </label>
          </div>
          <template v-if="!compose.sameForRole">
            <label for="role">Role</label>
            <InputText
              id="role"
              name="role"
              type="text"
              v-model="state.role"
              :placeholder="'i.e. sales lead / investor'"
            />
          </template>
        </div>
        <div class="col-6">
          <InputText
            name="project"
            type="text"
            v-model="state.project"
            :placeholder="'i.e. scrum master half time'"
          />
          <div class="d-flex gap-3">
            <div>
              <label>start</label>
              <DateInput :cb="v.updateDateStart" :init="v.getDateStart()"></DateInput>
            </div>
            <div>
              <label>end</label>
              <DateInput :cb="v.updateDateEnd" :init="v.getDateEnd()"></DateInput>
            </div>
          </div>
        </div>
        <div class="col-4 d-flex">
          <Textarea
            class="flex-1"
            name="description"
            type="text"
            placeholder="Project lenghtly description"
            v-model="state.description"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <label class="w-full">Sections</label>
        </div>
        <div class="col-sm-6 mb-3" v-for="section in getCategoriesOrdered">
          <InputGroup>
            <Button :class="icons.pLeft" @click="v.pushUp(section)"></Button>
            <Button
              :class="v.getIconOfCategory(section)"
              @click="v.toggleStyle(section)"
              class="m-0"
              severity="secondary"
            />
            <InputText
              :id="`sec-${section.order}`"
              v-on:change="v.updateLovCategory(section)"
              name="section"
              type="text"
              v-model="section.value"
              :placeholder="`sec-${section.order}`"
            />
            <Button @click="v.deleteSection(section)" :class="icons.pMinus"></Button>
            <Button @click="v.pushDown(section)" :class="icons.pRight"></Button>
          </InputGroup>

          <div class="input-group-vertical border rounded mt-3">
            <div class="form-group d-flex flex-col">
              <InputGroup v-for="(lov, index) in v.filterItemsFromLov(section)">
                <InputText
                  :id="`sec-${index + 1}`"
                  class="mb-0 py-0 list-input"
                  name="role"
                  type="text"
                  v-model="lov.value"
                  :placeholder="`...`"
                />
                <Button @click="v.removeLov(section, lov)" :class="icons.pMinus"></Button>
              </InputGroup>
              <div class="d-flex justify-center p-3">
                <div
                  @click="v.addLovTo(section)"
                  class="p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
                >
                  <div :class="icons.pPlus"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 mb-3" v-if="v.getCategoriesOrdered.length < 10">
          <label>Add section</label>
          <div
            @click="v.addSection(SECTION_STYLE.LIST)"
            class="p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
          >
            <div :class="icons.pList"></div>
          </div>
          <div
            @click="v.addSection(SECTION_STYLE.KEYS)"
            class="p-button p-component p-button-rounded p-button-icon-only p-button-outlined"
          >
            <div :class="icons.pkey"></div>
          </div>
        </div>
        <div class="container d-flex flex-wrap gap-2"></div>
      </div>

      <div class="button-container d-flex items-center mt-3">
        <div class="flex justify-center gap-2">
          <div>
            <Button
              class="save-button"
              severity="secondary"
              unstyled
              type="button"
              @click="state.visible = false"
            >
              <span v-if="state.isLoading" aria-busy="true"></span>
              <template v-else><span :class="icons.pTimes"></span></template
            ></Button>
          </div>
          <div>
            <Button
              class="save-button"
              severity="secondary"
              unstyled
              :type="!state.isLoading ? 'submit' : 'button'"
            >
              <span v-if="state.isLoading" aria-busy="true"></span>
              <template v-else> <span :class="icons.pSave"></span></template>
            </Button>
          </div>
        </div>
      </div>
    </form>
  </Dialog>
</template>
<style src="./style.scss" lang="scss" scoped></style>
