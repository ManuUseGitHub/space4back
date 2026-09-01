<script lang="ts" setup>
const { title } = defineProps<{ title: string; topic?: string }>();
</script>
<template>
  <div class="py-3">
    <div class="d-flex relative">
      <div class="flex-1 flex text-left gap-4 d-flex d-md-none items-center">
        <h1 class="upside-title">{{ title }}</h1>
      </div>
      <div class="p-0 upside-gradian-separator d-block d-md-none"></div>
    </div>
    <div class="flex relative">
      <div class="col max-w-fit overflow-y-hidden pr-4 d-none d-md-block">
        <div class="flex flex-col h-full">
          <h1 class="sideway-title-icon"></h1>
          <div class="flex flex-col grow items-center pb-3">
            <h1 class="sideway-title flex-1 text-right text-nowrap">{{ title }}</h1>
            <div class="flex-1"></div>
          </div>
        </div>
      </div>
      <div class="col px-3 border-l">
        <div class="d-flex items-center">
          <h6 class="mr-1 opacity-55">{{ topic }}</h6>
          <div class="flex-1"><hr class="mb-4" /></div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style src="./style.scss" lang="scss"></style>
