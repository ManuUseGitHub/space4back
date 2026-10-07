<script lang="ts" setup>


const props = defineProps<{ editable?: boolean; id?: string }>();

const DEFAULT_IMAGE =
  "/img/photo-1585676737728-432f58d5fdba.jpeg";

const {
  changeStyleOfPreviewImage,
  previewImage,
  shouldDisplaySendButton,
  onFileSelect,
  upload,
  cancel,
} = await useMedia(DEFAULT_IMAGE, `/api/medias/[ID]/PROFILE-S`, props.id);

</script>
<template>
  <div class="profile-picture no-flex relative p-1">
    <img :src="previewImage" :style="changeStyleOfPreviewImage" />
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
