<script lang="ts" setup>
import { Password } from "primevue";
import type { LoggedInUser } from "~~/server/DB/DTOs";
import { grecaptchaToken, onPassword, state, submit } from "./script";
import { getLabelHinted } from "~/utils/common/misc";

const loggedUser = ref<LoggedInUser | null>(null);
const captchaRef = ref<{ reset: () => void }>();
const route = useRoute();
const { url } = route.query;
const setCaptchaToken = (event: string) => {
  grecaptchaToken.value = event;
};
onMounted(async () => {
  loggedUser.value = await $fetch("/api/connexion/iam/", { method: "get" });
});
definePageMeta({
  layout: "no-auth",
});

const isLogged = computed(() => {
  return loggedUser.value;
});

const onSucessSign = async () => {
  if (url) {
    navigateTo(`${url}`);
  }
  captchaRef.value?.reset();
  loggedUser.value = await $fetch("/api/connexion/iam/", { method: "get" });
};

const goToCreate = () => {
  return url ? `/create?url=${url}` : "/create";
};
</script>
<template>
  <div class="w-full content-center flex flex-col split-background h-svh overflow-auto">
    <BookSpineForm
      spine="_Sign in"
      #default="{ onField, prevalidate, onValidation, hasError, errors, onError }"
    >
      <template v-if="!isLogged">
        <div class="row">
          <div class="col-lg-8">
            <h5 class="py-3">Email & Password</h5>

            <div class="flex flex-column gap-3">
              <form @submit.prevent="submit(onError, prevalidate(), onSucessSign)">
                <div class="row row-gap-5">
                  <div class="mx-auto col-md-8 row row-gap-5">
                    <FieldChecked
                      #default="{ onValue }"
                      :container-class="'col-12'"
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
                              value: state.mailAddress,
                            },
                            cb: () => onField('mailAddress'),
                          })
                        "
                        type="text"
                        v-model="state.mailAddress"
                      />
                    </FieldChecked>
                    <FieldChecked
                      :container-class="'col-12'"
                      :errors="errors"
                      :field="'password'"
                      :label="getLabelHinted('password')"
                      :icon="icons.pAsterisk"
                      :poptip="'The passwords should contain digits, capitals, and special characters'"
                      @validation="onValidation"
                      required
                    >
                      <template #default="{ onValue }">
                        <Password
                          :feedback="false"
                          @value-change="
                            onValue({
                              meta: {
                                field: 'password',
                                value: state.password,
                              },
                              cb: () => onPassword(onValidation, onField),
                            })
                          "
                          v-model="state.password"
                          toggleMask
                        />
                      </template>
                    </FieldChecked>
                    <div class="col-12">
                      <div class="flex">
                        <ReCaptcha
                          compact
                          ref="captchaRef"
                          :field="FIELD_NAMES.RE_CAPTCHA"
                          :errors="errors"
                          @token="
                            (event) => {
                              setCaptchaToken(event);
                              onField(FIELD_NAMES.RE_CAPTCHA);
                            }
                          "
                        >
                          <div>
                            <Button
                              v-tooltip.top="hasError ? 'You have errors to check' : ''"
                              :type="!hasError ? 'submit' : 'button'"
                              :aria-busy="state.isLoading"
                              :severity="hasError ? 'danger' : 'primary'"
                              >Log in
                            </Button>
                          </div>
                        </ReCaptcha>
                      </div>
                    </div>
                    <div class="col-12">
                      <span> No account yet ?</span>&nbsp;
                      <NuxtLink :to="goToCreate()">create an account</NuxtLink>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-1">
            <Divider layout="vertical" class="!hidden lg:!flex"><b>OR</b></Divider>
            <Divider layout="horizontal" class="!flex lg:!hidden" align="center"
              ><b>OR</b></Divider
            >
          </div>
          <div class="col flex flex-col">
            <h5 class="py-3">Continue with</h5>
            <div id="social-field-group"
              class="w-2/3 lg:w-full mx-auto py-3 grow content-center text-center border" role='bloc-field'
            >
              <div class="col-md-12">
                <GoogleSignInButton @signin="onSucessSign"></GoogleSignInButton>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <SignedUser :user="loggedUser!" @signout="loggedUser = null"></SignedUser>
      </template>
    </BookSpineForm>
  </div>
</template>
<style src="./style.scss"></style>
