<script lang="ts" setup>
definePageMeta({
  layout: "no-auth",
});
const route = useRoute();
const { url } = route.query;

const goHome = () => clearError({ redirect: "/home" });
const retry = () => {
  const urlPath = `${url}`;
  navigateTo(urlPath);
};
const changeAccount = async () => {
  await signout();
  const urlPath = `connexion?url=${url}`;
  navigateTo(urlPath);
};
</script>
<template>
  <div class="d-flex h-dvh flex-col items-center">
    <div class="relative flex w-full place-content-center">
      <img class="full-h-img" src="/img/goronlink.svg" alt="" />
      <div class="absolute pt-56">
        <div class="text-indigo-500 font-bold text-7xl">
          <h2>403 Forbidden</h2>
        </div>
        <div class="card bg-opacity-60 p-3">
          <div class="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
            Oups, you are not supposed to be here
          </div>
          <div class="font-medium text-sm md:text-xl lg:text-2xl mt-8">
            The action you wanted to perform requires special access rights.
          </div>
          <div>
            <Button severity="danger" @click="goHome">return home</Button>
            <Button severity="primary" @click="retry">retry</Button>
            <Button severity="primary" @click="changeAccount">change account</Button>
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
