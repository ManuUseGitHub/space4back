<script lang="ts" setup>
    defineProps<{titleSpace?:string,space?:string}>()
</script>
<template>
  <div class="d-flex">
    <header class="title mb-1 p-4 text-center">
      <span class="space ml-16 ">_SPACE{{ space }}</span> <span>{{ titleSpace }}</span>
      <hr class="left-0 w-full absolute" />
      <h6></h6>
    </header>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped></style>