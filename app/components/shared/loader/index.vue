<script setup lang="ts">
const isWorking = true;
</script>
<template>
  <div v-if="isWorking" class="loadr-overlay">
    <div class="loadr-box">
      <div class="loader-12"></div>
      Working ...
    </div>
  </div>
</template>
<style src="./style.scss" lang="scss"></style>