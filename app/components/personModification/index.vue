<script setup lang="ts">
import type { UserPreferencesDTO } from "~~/server/DB/DTOs";
import { onSubmit, setup } from "./script";


const props = defineProps<{ rawPreferences: UserPreferencesDTO; birthDate: string }>();
const userPreferences = props.rawPreferences;
const toast = useToast();

const gdState = ref<string>();
const state = ref({
  ...userPreferences,
  isLoading: false,
  toast,
  visible: false,
  showErrors:false
});
const selectedCode = ref<{ code: string; dial: string }>();

const errors = ref([] as ValidationError[]);
const selectedPhoneCode = (event: { code: string; dial: string }) => {
  selectedCode.value = event;
};
const changedPhone = (event: { field: string; value: string }) => {
  const { field, value } = event;

  changedField(field);
  state.value.phone = value;
};
const currentErrors = computed(() => {
  return errors.value;
});
const changedField = (field: string) => {
  if (errors.value.find((x) => x.path[0] == field)) {
    errors.value = errors.value.filter((x) => x.path[0] != field);
  }
};
const onValidation = (event: ValidationError) => {
  const path = event.path[0];
  const index = errors.value.findIndex((x) => x.path[0] == path);

  if (index != -1) {
    errors.value[index] = event;
  } else {
    errors.value.push(event);
  }
};
const onPickedGender = (event: "m" | "f" | "x") => {
  if (event != gdState.value) {
    gdState.value = event;
    state.value.gender = event;
  }
};

const longDate = () => {
  return new Date(state.value.dateUpdate || new Date()).toTimeString();
};
const open = () => {
  state.value.visible = true;
};
const hasError = computed(() => {
  return errors.value.length > 0;
});

const genderClass = computed(() => {
  const sign = state.value.gender;
  return sign == "m" ? "male-style" : sign == "f" ? "female-style" : "special-style";
});
defineExpose({ open });

setup(state.value);
</script>
<template>
  <Dialog
    v-model:visible="state.visible"
    modal
    header=" "
    class="card col-xxl-10 col-md-11 content-center"
  >
  <div 
    :class="hasError ? 'errored' : ''">
    <form @submit.prevent="onSubmit(state)">
      <div class="relative">
        <ErrorPanel :errors="errors" :show-error="state.showErrors" @toggle="state.showErrors=$event" ></ErrorPanel>
        <div class="p-3 pt-0">
          <div class="flex">
            <div class="col max-w-fit overflow-y-hidden pr-4">
              <h1 class="sideway-title-icon">
                <span :class="icons.pPenToSquare"></span>
              </h1>
              <h1 class="sideway-title flex-1 text-right">_Edit Info</h1>
            </div>
            <div class="col">
              <h5 class="py-3">Personal informations</h5>
              <div class="flex flex-column gap-3">
                <div class="row row-gap-5">
                  <FieldChecked
                    :container-class="`gender-picker ${genderClass}`"
                    :errors="currentErrors"
                    :field="'gender'"
                    :label="''"
                    :icon="icons.pUser"
                  >
                    <SelectButton
                      v-model="state.gender"
                      :options="genders"
                      optionLabel="value"
                      optionValue="value"
                      dataKey="value"
                      @pick="onPickedGender"
                      aria-labelledby="custom"
                    >
                      <template #option="slotProps">
                        <div>
                          <i :class="slotProps.option.icon"></i>
                          <Boy
                            class="h-16 gender-icon"
                            v-if="slotProps.option.value == 'm'"
                          ></Boy>
                          <Girl
                            class="h-16 gender-icon"
                            v-else-if="slotProps.option.value == 'f'"
                          ></Girl>
                          <Special class="h-16 gender-icon" v-else></Special>
                          <span>({{ slotProps.option.label }})</span>
                        </div>
                      </template>
                    </SelectButton>
                  </FieldChecked>
                  <FieldChecked
                    #default="{ onValue }"
                    @validation="onValidation"
                    required
                    :container-class="'col-md-6 col-xxl-4'"
                    :errors="currentErrors"
                    :field="'firstName'"
                    :label="getLabelHinted('firstName')"
                    :icon="icons.pUser"
                  >
                    <InputText
                      type="text"
                      v-model="state.firstName"
                      @value-change="
                        onValue({
                          meta: { field: 'firstName', value: state.firstName },
                          cb: () => changedField('firstName'),
                        })
                      "
                    />
                  </FieldChecked>
                  <FieldChecked
                    #default="{ onValue }"
                    @validation="onValidation"
                    required
                    :container-class="'col-md-6 col-xxl-4'"
                    :errors="currentErrors"
                    :field="'lastName'"
                    :label="getLabelHinted('lastName')"
                    :icon="icons.pUser"
                  >
                    <InputText
                      type="text"
                      v-model="state.lastName"
                      @value-change="
                        onValue({
                          meta: { field: 'lastName', value: state.lastName },
                          cb: () => changedField('lastName'),
                        })
                      "
                    />
                  </FieldChecked>
                
                  <FieldChecked
                    @validation="onValidation"
                    :container-class="'col-12'"
                    :errors="currentErrors"
                    :field="'address'"
                    :label="getLabelHinted('address')"
                    :icon="icons.pEnvelope"
                  >
                    <template #addonleft="{ onValue }"
                      ><InputGroupAddon>
                        <ToggleButton
                          v-model="state.addressVisible"
                          :onIcon="icons.pEye"
                          unstyled
                          onLabel=""
                          offLabel=""
                          :offIcon="icons.pEyeSlash"
                          aria-label="Do you confirm"
                        />
                      </InputGroupAddon>
                    </template>
                    <InputText type="text" name="address" v-model="state.address" />
                  </FieldChecked>
                  <FieldChecked
                    @validation="onValidation"
                    :container-class="'col'"
                    :errors="currentErrors"
                    :field="'mailAddress'"
                    :label="getLabelHinted('mailAddress')"
                    :icon="icons.pEnvelope"
                  >
                    <template #addonleft="{ onValue }"
                      ><InputGroupAddon>
                        <ToggleButton
                          v-model="state.mailAddressVisible"
                          :onIcon="icons.pEye"
                          unstyled
                          onLabel=""
                          offLabel=""
                          :offIcon="icons.pEyeSlash"
                          aria-label="Do you confirm"
                        />
                      </InputGroupAddon>
                    </template>
                    <InputText
                      type="text"
                      name="mailAddress"
                      v-model="state.mailAddress"
                      :disabled="true"
                    />
                  </FieldChecked>
                  <FieldChecked
                    @validation="onValidation"
                    :container-class="'col'"
                    :errors="currentErrors"
                    :field="'birthDate'"
                    :label="getLabelHinted('birthDate')"
                    :icon="icons.pCalendar"
                  >
                    <template #addonleft="{ onValue }"
                      ><InputGroupAddon>
                        <ToggleButton
                          v-model="state.addressVisible"
                          :onIcon="icons.pEye"
                          unstyled
                          onLabel=""
                          offLabel=""
                          :offIcon="icons.pEyeSlash"
                          aria-label="Do you confirm"
                        />
                      </InputGroupAddon>
                    </template>
                    <template #default="{ onValue }">
                      <DatePicker
                        :disabled="state.birthDate ? true : false"
                        @value-change="
                          onValue({
                            meta: { field: 'birthDate', value: state.birthDate },
                            cb: () => changedField('birthDate'),
                          })
                        "
                        v-model="state.birthDate"
                        dateFormat="dd/mm/yy"
                      />
                      <span
                        class="rounded w-10 inline-block ml-2 content-center text-center text-white bg-black"
                        v-tooltip="'You must be 18 years old'"
                      >
                        18!
                      </span>
                    </template>
                  </FieldChecked>

                  <PhoneField
                    :errors="currentErrors"
                    :phone="state.phone || ''"
                    :field="'phone'"
                    @code="selectedPhoneCode"
                    @phone="changedPhone"
                    @validation="onValidation"
                    required
                  >
                    <template #addonleft>
                      <InputGroupAddon>
                        <ToggleButton
                          role="InputGroupAddon"
                          v-model="state.phoneVisible"
                          :onIcon="icons.pEye"
                          unstyled
                          onLabel=""
                          offLabel=""
                          :offIcon="icons.pEyeSlash"
                          aria-label="Do you confirm"
                        />
                      </InputGroupAddon>
                    </template>
                  </PhoneField>

                  <!-- Footer -->
                </div>
                <hr />
                <h5>Professional informations</h5>
                <div class="row row-gap-5">
                  <FieldChecked
                    #default="{ onValue }"
                    @validation="onValidation"
                    required
                    :container-class="'col-md-6 col-xxl-4'"
                    :errors="currentErrors"
                    :field="'title'"
                    :label="getLabelHinted('title')"
                    :icon="icons.pBookmark"
                  >
                    <InputText
                      type="text"
                      v-model="state.title"
                      @value-change="
                        onValue({
                          meta: { field: 'title', value: state.title },
                          cb: () => changedField('title'),
                        })
                      "
                  /></FieldChecked>
                  <FieldChecked
                    #default="{ onValue }"
                    @validation="onValidation"
                    :container-class="'col-md-6 col-xxl-4'"
                    :errors="currentErrors"
                    :field="'enterprise'"
                    :label="getLabelHinted('enterprise')"
                    :icon="icons.pBuilding"
                  >
                    <InputText
                      type="text"
                      v-model="state.enterprise"
                      @value-change="
                        onValue({
                          meta: { field: 'enterprise', value: state.enterprise },
                          cb: () => changedField('enterprise'),
                        })
                      "
                  /></FieldChecked>
                  <FieldChecked
                    #default="{ onValue }"
                    @validation="onValidation"
                    :container-class="'col-md-6 col-xxl-4'"
                    :errors="currentErrors"
                    :field="'introduction'"
                    :label="getLabelHinted('introduction')"
                    :icon="icons.pBriefcase"
                  >
                    <Textarea
                      v-model="state.introduction"
                      class="w-full"
                      @value-change="
                        onValue({
                          meta: { field: 'introduction', value: state.introduction },
                          cb: () => changedField('introduction'),
                        })
                      "
                    />
                  </FieldChecked>
                  <FieldChecked
                    #default="{ onValue }"
                    @validation="onValidation"
                    :container-class="'col-md-6 col-xxl-4'"
                    :errors="currentErrors"
                    :field="'professionalGoal'"
                    :label="getLabelHinted('professionalGoal')"
                    :icon="icons.pBriefcase"
                  >
                    <Textarea
                      v-model="state.professionalGoal"
                      class="w-full"
                      @value-change="
                        onValue({
                          meta: {
                            field: 'professionalGoal',
                            value: state.professionalGoal,
                          },
                          cb: () => changedField('professionalGoal'),
                        })
                      "
                    />
                  </FieldChecked>
                </div>
              </div>
            </div>
            <div class="col max-w-fit opacity-0">
              <h1 class="sideway-title mr-4 flex-1 text-right">.</h1>
            </div>
          </div>
          <div class="button-container d-flex items-center mt-3">
            <div class="flex w-full justify-center flex-col">
              last saved : {{ longDate() }}
            </div>
            <div class="flex justify-end">
              <div>
                <Button
                  v-if="!hasError"
                  rounded
                  :type="!state.isLoading ? 'submit' : 'button'"
                  :icon="icons.pSave"
                  severity="secondary"
                  :aria-busy="state.isLoading"
                >
                </Button>
                <Button
                  v-else
                  v-tooltip.top="'You have errors to check'"
                  rounded
                  :icon="icons.pSave"
                  :aria-busy="state.isLoading"
                  severity="danger"
                >
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    </div>
    
  </Dialog>
</template>
<style src="./style.scss" lang="scss" scoped></style>
