<script lang="ts" setup>
import type { LoggedInUser } from "~~/server/DB/DTOs";
defineProps<{ user: LoggedInUser }>();
</script>
<template>
  <h2 class="fnt-typo-round-bold">Welcome back</h2>
  <h2>{{ user.firstName }} {{ user.lastName }}</h2>

  <div class="flex flex-column justify-center grow gap-3 pb-12">
    <div class="w-2xs h-2xs">
      <SessionPicture class="max-h-full" :id="user.id"></SessionPicture>
    </div>
  </div>
</template>
