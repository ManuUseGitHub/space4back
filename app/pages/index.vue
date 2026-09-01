<script setup lang="ts">
import type { LoggedInUser } from "~~/server/DB/DTOs";

const colorMode = useColorMode();
const appliedThem = computed(() => colorMode.preference);

const user = ref<LoggedInUser>();
const id = ref<string>();
onMounted(() => loadProfile());
onMounted(async () => {
  const user = await $fetch("/api/connexion/iam/");
});

const loadProfile = async () => {
  user.value = await $fetch("/api/connexion/iam/");
  id.value = user.value?.id;
};
</script>
<template>
  <div id="back" class="d-flex justify-center items-center h-lvh">
    <div class="d-flex bg-transparent! border p-5 rounded-4xl!">
      <div class="col lg:w-4xl xl:max-w-1/2">
        <div v-if="!user">
          <h1 class="text-5xl! fnt-typo-round-bold">Welcome t🍪:</h1>
          <br />
        </div>

        <img v-if="appliedThem == 'light'" src="/img/bougs-cookie-logo.png" alt="" />
        <img v-else-if="appliedThem == 'dark'" src="/img/bougs-logo-b.png" alt="" />
        <img class="h-6 inline" src="/img/luniversdemmlogotilt.png" alt="" /> by
        Luniversdemm
        <hr />
        <h3>The place to show the market what an incredible boug you are !</h3>
        <hr />
        <br />
        <h3 class="fnt-typo-round">Discover</h3>
        <div class="d-flex gap-3">
          <NuxtLink :to="'/mission'">
            <Button severity="primary" class="p-3 rounded-3xl! pushedButton"
              >Our mission <span :class="icons.pSparkles"></span>
            </Button>
          </NuxtLink>
          <NuxtLink :to="'#sectors'">
            <Button severity="primary" class="p-3 rounded-3xl! pushedButton"
              >Activity sectors</Button
            >
          </NuxtLink>
        </div>
      </div>
      <div class="col max-w-fit">
        <div class="border-r border h-full w-0 mx-5"></div>
      </div>
      <div class="col mx-auto flex-col max-w-fit d-flex justify-center" v-if="user">
        <div>
          <LandingProfile :user="user"></LandingProfile>
        </div>
      </div>
      <div v-else class="col mx-auto flex-col max-w-fit d-flex justify-center">
        <div class="col text-left">
          <h1 class="text-5xl! fnt-typo-round-bold">No account yet?</h1>
          <NuxtLink :to="'/create'">
            <Button severity="primary" class="p-3 rounded-3xl! pushedButton">
              Sign up
            </Button>
          </NuxtLink>
          <br />
          <hr />
          <h3 class="max-w-lg">
            Members have access to private spaces, keep preferences, creation of their
            custom portfolio and <span :class="icons.pPlus"></span
            ><span :class="icons.pPlus"></span>
          </h3>
          <hr />
        </div>
        <div class="col text-left">
          <h1 class="text-5xl! max-w-lg fnt-typo-round-bold">
            This is not my first time here
          </h1>
          <NuxtLink :to="'/connexion?url=/home'">
            <Button severity="primary" class="p-3 rounded-3xl! pushedButton">
              Sign in
            </Button>
          </NuxtLink>
          <br />
          <hr />
          <h3 class="max-w-lg">This is alwais a pleasure having you here</h3>
          <hr />
        </div>
      </div>
    </div>
  </div>
  <Sectors id="sectors"></Sectors>
</template>
<style>
html.dark {
  #back {
    background-color: #333;
  }
}
</style>
