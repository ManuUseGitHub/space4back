<script lang="ts" setup>
const lightMode = useCookie("lightMode");
const theme = /light|dark/.test(`${lightMode}`)?lightMode:"";

useHead({
  htmlAttrs: {
    class: computed(() => (theme)),
  },
});
</script>
<template>
  <nav-bar></nav-bar>
  <main>
    <slot />
  </main>
</template>
<style src="./style.scss"></style>
