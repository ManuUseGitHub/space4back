<template>
  
    <Select
      v-model="selectedTheme"
      @vue:updated="onPickedTheme()"
      :options="colorThemes"
      filter
      optionLabel="name"
      :placeholder="placeHolderText ? placeHolderText : 'Select something'"
      class="w-full"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex items-center">
          <div class="text-center"><slot></slot> {{ slotProps.value.name }}</div>
        </div>
        <template v-else>
        <slot></slot> {{ slotProps.placeholder }}
        </template>
      </template>
      <template #option="slotProps">
        <div class="flex items-center">
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Select>
  
</template>

<script lang="ts" setup>
const emit = defineEmits(["pick"]);
const props = defineProps<{
  colorThemes: { name: String; code: String }[];
  placeHolderText?: string;
  name: any;
  model: { name?: String; code: String };
}>();

const selectedTheme = ref<{ name: String; code: String }>();

onMounted(() => {
  const matching = props.colorThemes.find((t) => t.code == props.model.code);
  if (matching) {
    selectedTheme.value = matching;
  }
});

const onPickedTheme = () => {
  if (selectedTheme.value && selectedTheme.value?.code) {
    emit("pick", { field: props.name, ...selectedTheme.value });
  }
};
</script>
<style lang="scss">

</style>
