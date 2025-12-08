<script lang="ts" setup>

const emit = defineEmits(["signout"]);

</script>
<template>
  <Button
    severity="primary"
    @click="
      signout();
      $emit('signout');
    "
  >
    Sign out</Button
  >
</template>
