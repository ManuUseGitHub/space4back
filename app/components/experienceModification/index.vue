<script setup lang="ts">
import type { ExperienceDTO } from "~~/server/DB/DTOs";
import { compose, state, v } from "./script";

const toast = useToast();
const { open } = v;

const page = ref<"general" | "sections">("general");
const setSectionsPage = () => {
  page.value = "sections";
};
const setGeneralPage = () => {
  page.value = "general";
};

const sectionList = ref(null);

watch(sectionList, (newValue, oldValue) => {
  if (!state.value.lov.length && newValue) {
    (sectionList.value! as any).addSection(state.value, SECTION_STYLE.LIST, "Tasks");
  }
});

defineExpose({ open });
</script>
<template>
  <Dialog v-model:visible="state.visible" modal class="min-w-10/12 m-5">
    <template #container="{ closeCallback }">
      <BookSpineForm
        :spine="compose.mode == 'edit' ? 'Edit' : 'New'"
        is-contained
        #default="{ onField, prevalidate, onValidation, hasError, errors, onError }"
      >
        <form @submit.prevent="v.onSubmit(toast)">
          <div class="row" v-if="page == 'general'">
            <div class="col-sm-6">
              <FieldChecked
                #default="{ onValue }"
                :errors="errors"
                :field="'employer'"
                @validation="onValidation"
                required
              >
                <InputText
                  @value-change="
                    onValue({
                      meta: {
                        field: 'employer',
                        value: state.employer,
                      },
                      cb: () => {
                        onField('employer');
                        v.updateClient();
                      },
                    })
                  "
                  type="text"
                  v-model="state.employer"
                />
              </FieldChecked>

              <br />
              <div class="flex items-center gap-2 mb-3">
                <Checkbox
                  @change="
                    v.sameForClientChanged(toast);
                    onField('client');
                  "
                  inputId="sameForClient"
                  v-model="compose.sameForClient"
                  binary
                />
                <label for="sameForClient" class="mb-0"> Same as client </label>
              </div>
              <template v-if="!compose.sameForClient">
                <FieldChecked
                  #default="{ onValue }"
                  :errors="errors"
                  :field="'client'"
                  @validation="onValidation"
                  required
                >
                  <InputText
                    @value-change="
                      onValue({
                        meta: {
                          field: 'client',
                          value: state.client,
                        },
                        cb: () => {
                          onField('client');
                        },
                      })
                    "
                    type="text"
                    v-model="state.client"
                  />
                </FieldChecked>
                <br />
              </template>
            </div>
            <div class="col-sm-6">
              <FieldChecked
                #default="{ onValue }"
                :errors="errors"
                :field="'title'"
                @validation="onValidation"
                required
              >
                <InputText
                  @value-change="
                    onValue({
                      meta: {
                        field: 'title',
                        value: state.title,
                      },
                      cb: () => {
                        onField('title');
                        v.updateRole();
                      },
                    })
                  "
                  type="text"
                  v-model="state.title"
                />
              </FieldChecked>

              <br />
              <div class="flex items-center gap-2 mb-3">
                <Checkbox
                  @change="
                    v.sameForRoleChanged(toast);
                    onField('role');
                  "
                  inputId="sameForRole"
                  v-model="compose.sameForRole"
                  binary
                />
                <label for="sameForRole" class="mb-0"> Same as role </label>
              </div>
              <template v-if="!compose.sameForRole">
                <FieldChecked
                  #default="{ onValue }"
                  :errors="errors"
                  :field="'role'"
                  @validation="onValidation"
                  required
                >
                  <InputText
                    @value-change="
                      onValue({
                        meta: {
                          field: 'role',
                          value: state.role,
                        },
                        cb: () => {
                          onField('role');
                        },
                      })
                    "
                    type="text"
                    v-model="state.role"
                  />
                </FieldChecked>
                <br />
              </template>
            </div>
            <div class="col-6">
              <FieldChecked
                #default="{ onValue }"
                :errors="errors"
                :field="'project'"
                @validation="onValidation"
                required
              >
                <InputText
                  @value-change="
                    onValue({
                      meta: {
                        field: 'project',
                        value: state.project,
                      },
                      cb: () => {
                        onField('project');
                      },
                    })
                  "
                  type="text"
                  v-model="state.project"
                />
              </FieldChecked>
              <br />

              <div class="d-flex gap-3">
                <div class="col">
                  <FieldChecked
                    #default="{ onValue }"
                    :errors="errors"
                    :field="'monthStart'"
                    @validation="onValidation"
                    required
                  >
                    <DateInput
                      @value-change="
                        onValue({
                          meta: {
                            field: 'monthStart',
                            value: state.monthStart,
                          },
                          cb: () => {
                            onField('monthStart');
                          },
                        })
                      "
                      :cb="v.updateDateStart"
                      :init="v.getDateStart()"
                    ></DateInput>
                  </FieldChecked>
                </div>
                <div class="col">
                  <FieldChecked
                    #default="{ onValue }"
                    :errors="errors"
                    :field="'monthEnd'"
                    @validation="onValidation"
                    required
                  >
                    <DateInput
                      @value-change="
                        onValue({
                          meta: {
                            field: 'monthEnd',
                            value: state.monthEnd,
                          },
                          cb: () => {
                            onField('monthEnd');
                          },
                        })
                      "
                      :cb="v.updateDateEnd"
                      :init="v.getDateEnd()"
                    ></DateInput>
                  </FieldChecked>
                </div>
              </div>
            </div>
            <FieldChecked
              @validation="onValidation"
              :container-class="'col-6 d-flex'"
              :errors="errors"
              :field="'projectDescription'"
              required
            >
              <Textarea v-model="state.description" class="w-full" />
            </FieldChecked>
          </div>

          <SectionList
            v-else
            ref="sectionList"
            :errors="errors"
            v-on:validation="onValidation"
            :state="state"
          ></SectionList>
          
          <div class="d-flex justify-center gap-3 mt-3">
            <Button severity="primary" v-if="page != 'general'" @click="setGeneralPage()">
              <span :class="icons.pLeft"></span> General
            </Button>
            <Button severity="primary" v-else @click="setSectionsPage()">
              Tasks and keywords <span :class="icons.pRight"></span>
            </Button>
            <Button severity="primary" :type="!state.isLoading ? 'submit' : 'button'">
              <span v-if="state.isLoading" aria-busy="true"></span>
              <template v-else> <span :class="icons.pSave"></span></template>
            </Button>
            <Button severity="danger" @click="state.visible = false">
              <span v-if="state.isLoading" aria-busy="true"></span>
              <template v-else
                ><span :class="icons.pTimes" class="text-red-900!"></span
              ></template>
            </Button>
          </div>
        </form>
      </BookSpineForm>
    </template>
  </Dialog>
</template>
<style src="./style.scss" lang="scss" scoped></style>
