<script lang="ts" setup>
import { usePreviewImage } from "./script";

let { id } = defineProps<{ id?: string }>();
const previewImage = await usePreviewImage(id);
</script>
<template>
  <div class="h-full profile-picture cicle-image relative overflow-hidden">
    <img :src="previewImage"/>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped></style>
