<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { grecaptchaToken, onSubmit, resetedUser } from "./script";
import { onPassword } from "../connexion/script";
import { getLabelHinted } from "~/utils/common/misc";

const state = ref({
  user: resetedUser(),
  isLoading: false,
  toast: useToast(),
});
const setCaptchaToken = (event: string) => {
  grecaptchaToken.value = event;
};
const captchaRef = ref<{ reset: () => void }>();
definePageMeta({
  layout: "no-auth",
});

const passwords = ref({
  password: "",
  repeatPass: "",
});

const selectedCode = ref<{ code: string; dial: string }>();
const selectedPhoneCode = (event: { code: string; dial: string }) => {
  selectedCode.value = event;
};

const changedPassword = (
  event: { field: "password" | "repeatPass"; value: string },
  onField: FieldCB
) => {
  const { field, value } = event;

  onField(field);
  onField("hashedPassword");

  passwords.value[field] = value;
};
const changedPhone = (event: { field: string; value: string }, onField: FieldCB) => {
  const { field, value } = event;

  onField(field);
  state.value.user.phone = value;
};

const submit = (onError: ErrorCB, errors: ValidationError[]) => {
  onSubmit(
    state.value as any,
    passwords.value,
    selectedCode.value!,
    errors,
    onError,
    async (response: any) => {
      const result = await response;
      if (result.error) {
        onError(result.error);
      } else {
        const route = useRoute();
        const { url } = route.query;
        if (url) {
          navigateTo(`${url}`);
        }
        captchaRef.value?.reset();
      }
    }
  );
};
</script>

<template>
  <div class="w-full content-center flex flex-col split-background h-svh overflow-auto">
    <BookSpineForm spine="_Sign up">
      <template #default="{ onField, prevalidate, onValidation, errors, onError }">
        <form @submit.prevent="submit(onError, prevalidate())">
          <h5 class="py-3">Personal informations</h5>
          <div class="flex flex-column gap-3">
            <div class="row row-gap-5">
              <FieldChecked
                #default="{ onValue }"
                @validation="onValidation"
                required
                :container-class="'col-xl-6 col-xxl-4'"
                :errors="errors"
                :field="'firstName'"
                :label="getLabelHinted('firstName')"
                :icon="icons.pUser"
              >
                <InputText
                  type="text"
                  v-model="state.user.firstName"
                  @value-change="
                    onValue({
                      meta: { field: 'firstName', value: state.user.firstName },
                      cb: () => onField('firstName'),
                    })
                  "
                />
              </FieldChecked>
              <FieldChecked
                #default="{ onValue }"
                @validation="onValidation"
                required
                :container-class="'col-xl-6 col-xxl-4'"
                :errors="errors"
                :field="'lastName'"
                :label="getLabelHinted('lastName')"
                :icon="icons.pUser"
              >
                <InputText
                  type="text"
                  v-model="state.user.lastName"
                  @value-change="
                    onValue({
                      meta: { field: 'lastName', value: state.user.lastName },
                      cb: () => onField('lastName'),
                    })
                  "
                />
              </FieldChecked>
              <FieldChecked
                @validation="onValidation"
                required
                :container-class="'col-xl-6 col-xxl-4'"
                :errors="errors"
                :field="'birthDate'"
                :label="getLabelHinted('birthDate')"
                :icon="icons.pCalendar"
              >
                <template #default="{ onValue }">
                  <DatePicker
                    @value-change="
                      onValue({
                        meta: { field: 'birthDate', value: state.user.birthDate },
                        cb: () => onField('birthDate'),
                      })
                    "
                    v-model="state.user.birthDate"
                    dateFormat="dd/mm/yy"
                  />
                </template>
                <template #after>
                  <span
                    class="rounded w-14 inline-block ml-2 content-center text-center text-white bg-black"
                    v-tooltip="'You must be 18 years old'"
                  >
                    18!
                  </span></template
                >
              </FieldChecked>
            </div>
            <hr />
            <h5>Contact informations</h5>
            <div class="row row-gap-5">
              <FieldChecked
                #default="{ onValue }"
                :container-class="'col-xl-6'"
                :errors="errors"
                :field="'mailAddress'"
                :label="getLabelHinted('mailAddress')"
                :icon="icons.pEnvelope"
                @validation="onValidation"
                required
              >
                <InputText
                  @value-change="
                    onValue({
                      meta: {
                        field: 'mailAddress',
                        value: state.user.mailAddress,
                      },
                      cb: () => onField('mailAddress'),
                    })
                  "
                  type="text"
                  v-model="state.user.mailAddress"
                />
              </FieldChecked>
              <PhoneField
                :invalidate="onValidation"
                :refresh-fld="onField"
                :errors="errors"
                :phone="state.user.phone"
                :field="'phone'"
                @code="selectedPhoneCode"
                @phone="changedPhone"
                @validation="onValidation"
              ></PhoneField>
            </div>
            <Panel class="mt-3" severity="info" toggleable :collapsed="true">
              <template #header>
                <h5 class="text-white m-0">
                  <span :class="icons.pShield"></span> Sensitive info note
                </h5>
              </template>
              <template #toggleicon="{ collapsed }">
                <span :class="collapsed ? icons.pEye : icons.pEyeSlash"></span>
              </template>
              <p class="m-0">
                These pieces of information kept invisible by default can be shared to
                contact you. You can manage their visibility on your profile.
              </p>
            </Panel>
            <hr />
            <div class="row row-gap-5">
              <SignUpPassword
                :errors="errors"
                :invalidate="onValidation"
                :refresh-fld="onField"
                @password="
                  (event:any) => {
                    changedPassword(event, onField);
                    onPassword(onValidation, onField);
                  }
                "
                @validation="onValidation"
              >
              </SignUpPassword>
            </div>
            <hr />
            <ReCaptcha
              :errors="errors"
              ref="captchaRef"
              :field="FIELD_NAMES.RE_CAPTCHA"
              @token="
                (event) => {
                  setCaptchaToken(event);
                  onField(FIELD_NAMES.RE_CAPTCHA);
                }
              "
            ></ReCaptcha>
          </div>
        </form>
      </template>

      <template #actionButton="{ hasError, prevalidate, onError }"
        ><div class="flex justify-end">
          <div>
            <Button
              v-if="!hasError"
              rounded
              :type="!state.isLoading ? 'submit' : 'button'"
              :icon="icons.pSave"
              severity="secondary"
              :aria-busy="state.isLoading"
              @click="submit(onError, prevalidate())"
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
      </template>
    </BookSpineForm>
  </div>
</template>

<style src="./style.scss" lang="scss" scoped></style>
