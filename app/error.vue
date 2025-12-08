<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const { error: err, url, statusCode, statusMessage, message, stack } = props.error as any;
const detailedError = { err, message, http: `${url} : ${statusCode} ${statusMessage} ` };
onMounted(() => {
  $fetch("/api/log/", {
    method: "post",
    body: {
      message: `${JSON.stringify(detailedError, null, 2)} \nSTACK:\n${stack}`,
      level: "error",
    },
  });
});

const goHome = () => clearError({ redirect: "/home" });
</script>

<template>
  <div class="d-flex h-dvh flex-col items-center">
    <div class="relative flex w-full place-content-center">
      <img class="full-h-img" src="/img/happymasksailsman.svg" alt="" />
      <div class="absolute pt-56">
        <div class="text-indigo-500 font-bold text-7xl">
          <h2>{{ statusCode }}</h2>
        </div>
        <div class="card bg-opacity-60 p-3">
          <div class="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
            Oh no ! You've met with a terrible fate'd<br />
            "{{ statusCode != 500 ? `${statusMessage}` : "Server error..." }}" <br />error
          </div>
          <div class="font-medium text-sm md:text-xl lg:text-2xl mt-8">
            The action you wanted to perform failed. This is sad but not all hope is lost.
            Call for help, ask our admin or retry later...
          </div>
          <div>
            Or shall you
            <Button @click="goHome">returning home</Button> ?
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.full-h-img {
  height: 100vh;
}
.bg-opacity-60 {
  background-color: #ffffff77;
}
</style>
