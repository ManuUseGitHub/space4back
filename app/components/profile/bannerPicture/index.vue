<script lang="ts" setup>
import type { UserProfileBannerPictureDTO } from "~~/server/DB/DTOs";
import { usePreviewImage } from "./script";
import { imageFromBuffer } from "~/utils/common/misc";

const route = useRoute();
const toast = useToast();
const { id } = route.params;
const data = await $fetch("/api/banner/" + id);

const userPreferences = data as UserProfileBannerPictureDTO;

userPreferences.banner = userPreferences.banner
  ? imageFromBuffer(userPreferences.banner)
  : "";

const banner = ref(userPreferences);
const fileupload = ref();
const src = ref<string | ArrayBuffer | null>();

const {
  changeStyleOfPreviewImage,
  previewImage,
  shouldDisplaySendButton,
  onFileSelect,
  upload,
  cancel,
} = usePreviewImage({ src, state: banner, fileupload, toast, id });

const props = defineProps<{ editable?: boolean }>();
</script>
<template>
  <div class="profile-picture banner-image relative">
    <img :src="previewImage" :style="changeStyleOfPreviewImage" />
    <div class="banner-overlay" />
    <template v-if="props.editable">
      <div class="send-button">
        <Button
          v-if="shouldDisplaySendButton"
          icon="pi pi-send"
          rounded
          @click="upload"
          severity="secondary"
        />
      </div>
      <div class="upload-button">
        <FileUpload
          mode="basic"
          @select="onFileSelect"
          customUpload
          :severity="!shouldDisplaySendButton ? 'secondary' : 'danger'"
          auto
          class="p-button-rounded p-button-icon-only p-button-outlined"
          rounded
          name="demo[]"
          ref="fileupload"
          :multiple="false"
          accept="image/*"
          :class="shouldDisplaySendButton ? 'd-none' : ''"
        >
          <template #chooseicon>
            <span v-if="!shouldDisplaySendButton" :class="icons.pPencil"></span>
          </template>
        </FileUpload>
        <Button
          v-if="shouldDisplaySendButton"
          icon="pi pi-times"
          rounded
          @click="cancel"
          severity="danger"
        />
      </div>
    </template>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped></style>
