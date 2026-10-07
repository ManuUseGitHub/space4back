<script lang="ts" setup>

const DEFAULT_IMAGE =
  "/img/vecteezy_architecture-and-interior-concept-empty-room-and-wood-panels_31147772.jpg";

const {
  changeStyleOfPreviewImage,
  previewImage,
  shouldDisplaySendButton,
  onFileSelect,
  upload,
  cancel,
} = await useMedia(DEFAULT_IMAGE, "/api/medias/[ID]/BANNER-S");

const { editable, noOverlay } = defineProps<{
  editable?: boolean;
  noOverlay?: Boolean;
}>();
</script>
<template>
  <div class="profile-picture banner-image relative">
    <img :src="previewImage" :style="changeStyleOfPreviewImage" />
    <div class="banner-overlay" v-if="!noOverlay" />
    <template v-if="editable">
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
