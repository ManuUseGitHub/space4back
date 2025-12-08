<script lang="ts" setup>
import type { UserProfilePictureDTO } from "~~/server/DB/DTOs";
import { usePreviewImage } from "./script";
import { imageFromBuffer } from "~/utils/common/misc";

const route = useRoute();
const toast = useToast();
const props = defineProps<{ editable?: boolean; id?: string }>();
console.log(props)
const { id } = route.params;
const data = await $fetch("/api/photo/" + (props.id || id));

const userPreferences = data as UserProfilePictureDTO;

userPreferences.photo = userPreferences.photo
  ? imageFromBuffer(userPreferences.photo)
  : "";

const photo = ref(userPreferences);
const fileupload = ref();
const src = ref<string | ArrayBuffer | null>();

const {
  changeStyleOfPreviewImage,
  previewImage,
  shouldDisplaySendButton,
  onFileSelect,
  upload,
  cancel,
} = usePreviewImage({ src, state: photo, fileupload, toast, id });
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
