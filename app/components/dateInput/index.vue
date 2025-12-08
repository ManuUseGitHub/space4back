<script lang="ts" setup>
const thisYear = new Date().getFullYear();
const props = defineProps<{ cb: (month: number, year: number) => void,
  init?:string
 }>();
 const state = ref({ date: props.init || "" });
const formatInputToDate = () => {
  let value = state.value.date;
  value = value.replace(/[^0-9\/ ]/gm, "");
  let numbers = value.replace(/[^0-9]/gm, "");

  const m = /^(?<month>\d{0,2})(?<year>\d{0,4})/g.exec(numbers);
  if (m) {
    let { month, year } = m.groups!;
    if (month?.length || year?.length) {
      state.value.date = `${month} / ${year}`;
      props.cb(parseInt(month!), year?.length == 0 ? thisYear : parseInt(year!));
    } else {
      state.value.date = "";
    }
  }
};

</script>
<template>
  <InputText
    @keyup="formatInputToDate()"
    name="dateStart"
    v-model="state.date"
    placeholder="MM / YYYY"
  />
</template>
