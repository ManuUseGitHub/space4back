<script lang="ts" setup>
    const {classNames} = defineProps<{
        classNames?:string
    }>()
</script>
<template>
    <div :class="classNames" class="inline-flex gap-3 max-w-fit border p-1 align-items-center">
        <slot></slot>
    </div>
</template>