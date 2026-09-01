<script lang="ts" setup></script>
<template>
  <div class="text-center justify-items-center border w-full tilted-bg py-6">
    <div class="error-pattern-bg"></div>
    <slot name="default">
      <BoxError class="h-16"></BoxError>
      <h4>
        <span :class="icons.pTimes"></span> Nothing here yet
        <span :class="icons.pTimes"></span>
      </h4>
    </slot>
    <slot name="body"></slot>
  </div>
</template>
<style src="./style.scss" lang="scss"></style>
