<script lang="ts" setup>
import { usePreviewImage } from "./script";

let { id } = defineProps<{ id?: string }>();
const imageProfile = ref<string>("/img/unknown-picture.svg");
usePreviewImage(id).then(img => {
  imageProfile.value = img;
});

</script>
<template>
  <div class="h-full profile-picture cicle-image relative overflow-hidden">
    <img :src="imageProfile"/>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped></style>
