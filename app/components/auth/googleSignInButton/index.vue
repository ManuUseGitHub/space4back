<script lang="ts" setup>
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const emit = defineEmits(["signin"]);

const signinViaGoolge = async () => {
  const { $auth } = useNuxtApp();
  signInWithPopup($auth, new GoogleAuthProvider())
    .then(async (result) => {
      const user = result.user;
      const idToken = await user.getIdToken();
      const providerData = user.providerData;

      await $fetch("/api/connexion/login/google/", {
        body: {
          idToken,
          user: {
            ...providerData[0],
            uid: user.uid,
            emailVerified: user.emailVerified,
          },
        },
        method: "POST",
      });

      emit("signin");
    })
    .catch((error) => {
      logIt(
        {
          // Handle Errors here.
          errorCode: error.code,
          errorMessage: error.message,
          // The email of the user's account used.
          email: error.customData.email,
          // The AuthCredential type that was used.
          credential: GoogleAuthProvider.credentialFromError(error),
          // ...
        },
        "error"
      );
    });
};
</script>
<template>
  <div class="flex flex-col">
    <div>
      <Button
        severity="primary"
        class="text-2xl! social-button"
        @click="signinViaGoolge()"
      >
        <span class="lg:hidden">
          <span :class="icons.pGoogle"></span>
          &bull;
        </span>
        Google
      </Button>
    </div>
  </div>
</template>
<style src="./style.scss" lang="scss"></style>
