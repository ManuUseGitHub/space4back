<script lang="ts" setup>
import type { UserPreferencesDTO } from "~~/server/DB/DTOs";
const route = useRoute();
const { asVisitor } = route.query;

const id = route.params.id as string;
const data: any = await $fetch("/api/user/" + id);
const userPreferences = parseDates(data) as UserPreferencesDTO;

const isVisitor = ref<Boolean>();

onMounted(async () => {
  isVisitor.value = !(
    !asVisitor && (await $fetch("/api/connexion/same", { method: "post", body: { id } }))
  );
});
</script>
<template>
  <div class="info-pane-revert border p-3">
    <Identity
      :is-visitor="!isVisitor"
      :raw-preferences="userPreferences"
      :birth-date="data.birthDate"
    >
    </Identity>
    <hr />
    <div class="d-flex gap-2">
      <div class="col max-w-fit">
        <ProfilePicture :editable="!isVisitor"></ProfilePicture>
      </div>
      <div class="col relative overflow-hidden border">
        <BannerPicture :editable="!isVisitor" :no-overlay="true"></BannerPicture>
      </div>
    </div>
    <p class="mt-1 mb-0"><small><span :class="icons.pHashtag"></span> {{ id }}</small></p>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped></style>
;
