<script setup lang="ts">
import type { LogItem } from "~~/server/api/log/.get";
import Prism from "prismjs";
import "prismjs/components/prism-json";

const {logItems} = defineProps<{logItems?:LogItem[]}>();
const highlighted = (content: string) => {
  console.log(content);
  return Prism.highlight(content, Prism.languages.json!, "json");
};
</script>
<template>
    <div v-for="(line, i) in logItems || []" :key="i">
            <h6>
              <span
                ><Badge> {{ i + 1 }} </Badge>&nbsp;{{ line!.metaData.date }}</span
              >
              <span> {{ line!.metaData.level }}</span>
              <span> {{ line!.metaData.source }}</span>
            </h6>

            <pre><code class="language-json" v-html="highlighted(line!.content)"></code></pre>
          </div>
</template>