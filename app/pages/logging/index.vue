<script setup lang="ts">
import Prism from "prismjs";
import "prismjs/components/prism-json";
import { ref } from "vue";

import type { LogItem } from "~~/server/api/log/.get";

const toast = useToast();

type LogLists = {
  infos: LogItem[];
  warnings: LogItem[];
  errors: LogItem[];
  fatals: LogItem[];
};

const logs = ref<LogLists>();
const error = ref();

async function fetchLogs() {
  try {
    $fetch("/api/log")
      .then((data) => {
        if (data.logs) {
          const differentLogs: LogLists = {
            infos: [],
            warnings: [],
            errors: [],
            fatals: [],
          };
          data.logs.forEach((item) => {
            if (/^__VOID__LOG__$/.test(item.content)) item.content = "";

            if (/INFO/.test(item.metaData.level)) {
              differentLogs.infos.push(item);
            } else if (/WARN/.test(item.metaData.level)) {
              differentLogs.warnings.push(item);
            } else if (/ERROR/.test(item.metaData.level)) {
              differentLogs.errors.push(item);
            } else if (/FATAL/.test(item.metaData.level)) {
              differentLogs.fatals.push(item);
            }
          });
          logs.value = differentLogs;
        }
      })
      .catch((err) => {
        error.value = "Failed to load logs.";
      });
  } catch (err) {
    error.value = "Failed to load logs.";
  }
}

const getLogs = computed(() => {
  return logs.value;
});

const logSomething = () => {
  logIt("something bad", "error");
};

const clearLogs = async () => {
  $fetch("api/log", { method: "DELETE" }).then(() => {
    toastSuccess(toast, "cleared");
  }); //
};

const state = ref<{ timer: any; watching: boolean }>({
  timer: null,
  watching: false,
});

const highlighted = (content: string) => {
  console.log(content);
  return Prism.highlight(content, Prism.languages.json!, "json");
};

function startStopWatching() {
  if (state.value.watching) {
    stopWatching();
  } else {
    startWatching();
  }
}
function startWatching() {
  if (state.value.watching) return; // already watching
  state.value.watching = true;
  state.value.timer = setInterval(fetchLogs, 1000); // every 2s
}

function stopWatching() {
  if (state.value.timer) {
    clearInterval(state.value.timer);
    state.value.timer = null;
  }
  state.value.watching = false;
}
onMounted(() => {
  setTimeout(() => {
    fetchLogs();
  }, 200);
});
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-semibold text-center">📜 Application Logs</h1>

    <div v-if="error" class="text-red-400 mb-2">{{ error }}</div>
    <div class="flex justify-center mt-4">
      <button
        @click="fetchLogs"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Refresh Logs
      </button>
      <Button @click="logSomething()">log logSomething</Button>
      <Button @click="startStopWatching()">{{
        state.watching ? "stop watching" : "start watching"
      }}</Button>
      <Button @click="clearLogs()">
        <span :class="icons.pTimes"></span> Clear logs</Button
      >
    </div>
    <Tabs value="0">
      <TabList>
        <Tab value="0"> Infos <Badge :value="getLogs?.infos.length"></Badge></Tab>
        <Tab value="1">Warnings <Badge :value="getLogs?.warnings.length"></Badge></Tab>
        <Tab value="2">Errors <Badge :value="getLogs?.errors.length"></Badge></Tab>
        <Tab value="3">Fatals <Badge :value="getLogs?.fatals.length"></Badge></Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <LogItemsList :log-items="getLogs?.infos"></LogItemsList>
        </TabPanel>
        <TabPanel value="1">
          <LogItemsList :log-items="getLogs?.warnings"></LogItemsList>
        </TabPanel>
        <TabPanel value="2">
          <LogItemsList :log-items="getLogs?.errors"></LogItemsList>
        </TabPanel>
        <TabPanel value="3">
          <LogItemsList :log-items="getLogs?.fatals"></LogItemsList>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
