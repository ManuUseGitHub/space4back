<script lang="ts" setup>
const emit = defineEmits(["signout"]);
const { userId } = defineProps<{ userId: string }>();
</script>
<template>
  <div class="inline-flex gap-2">
    <Button class="text-white"
      severity="danger"
      @click="
        signout();
        $emit('signout');
      "
    >
      <span class="!text-red-800" :class="icons.pSignOut"></span> Sign out</Button
    >
    <NuxtLink :to="'/home'"
      ><Button severity="primary">
        <span :class="icons.pHome"></span> Home
      </Button></NuxtLink
    >
    <NuxtLink :to="'/u/' + userId"
      ><Button severity="primary">
        <span :class="icons.pUser"></span> Profile
      </Button></NuxtLink
    >
  </div>
</template>
