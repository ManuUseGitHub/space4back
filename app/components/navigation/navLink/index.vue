<script setup lang="ts">
import type { MenuRouterBindProps } from "primevue";
import type { MenuItem } from "primevue/menuitem";

const { props, item, root } = defineProps<{ props: MenuRouterBindProps; item: MenuItem, root?:any }>();
</script>
<template>
  <NuxtLink :to="item.to" v-ripple class="flex items-center" v-bind="props.action">
    <span :class="item.icon"></span>
    <span>{{ item.label }}</span>
    <Badge
      v-if="item.badge"
      :class="{ 'ml-auto': !root, 'ml-2': root }"
      :value="item.badge"
    />
  </NuxtLink>
</template>
<style src="./style.scss" lang="scss"></style>
