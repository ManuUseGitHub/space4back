<script lang="ts" setup>
import { ref } from "vue";
import type { LoggedInUser } from "~~/server/DB/DTOs";

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    to: "/home",
  },
  {
    label: "Projects",
    icon: "pi pi-search",
    badge: 3,
    items: [
      {
        label: "Core",
        icon: "pi pi-bolt",
        shortcut: "⌘+S",
      },
      {
        label: "Blocks",
        icon: "pi pi-server",
        shortcut: "⌘+B",
      },
      {
        separator: true,
      },
      {
        label: "UI Kit",
        icon: "pi pi-pencil",
        shortcut: "⌘+U",
      },
    ],
  },
]);

const renderComponent = ref(true);
const forceRerender = async () => {
  // Remove MyComponent from the DOM
  renderComponent.value = false;

  // Wait for the change to get flushed to the DOM
  await nextTick();

  // Add the component back in
  renderComponent.value = true;
};
const handleLogout = async () => {
  await signout();
  await loadProfile();
  location.reload();
  setTimeout(forceRerender, 3000);
};
const userMenuRef = ref();
const userMenu = ref([
  { label: "Profile", icon: "pi pi-user", to: "/profile" },
  { label: "Settings", icon: "pi pi-cog", to: "/settings" },
  { separator: true },
  { label: "Logout", icon: "pi pi-sign-out", command: () => handleLogout() },
]);

const route = useRoute();
const login = { label: "Login", icon: "pi pi-user", to: `/connexion?url=${route.path}` };

const user = ref<LoggedInUser>();
const id = ref<string>();
const userId = computed(() => {
  return id.value;
});

onMounted(() => loadProfile());

const loadProfile = async () => {
  user.value = await $fetch("/api/connexion/iam/");
  id.value = user.value?.id;
  const menuItem = userMenu.value.find((m) => /profile/i.test(m.label!));
  if (menuItem) {
    menuItem.to = `/u/${id.value}`;
  }
};
</script>

<template v-if="renderComponent">
  <div class="sticky-menubar">
    <Menubar :model="items">
      <template #start class="flex-1">
        <img class="h-8!" src="/img/luniversdemmlogotilt.png" />
      </template>
      <template #item="{ item, props, root }">
        <NavLink :props="props" :item="item" :root="root" />
      </template>
      <template #end>
        <div class="flex items-center gap-2 p-menubar-root-list h-8">
          <template v-if="user">
            <span> {{ user?.firstName }}</span>

            <!-- Dropdown menu -->
            <Menu ref="userMenuRef" :model="userMenu" popup>
              <template #item="{ item, props }">
                <NavLink :props="props" :item="item" />
              </template>
            </Menu>
            <div @click="userMenuRef.toggle($event)" class="h-8 flex gap-2" v-if="userId">
              <!-- Profile picture -->
              <SessionPicture v-if="userId" :id="userId" />

              <!-- Dropdown trigger -->
              <button class="p-button p-button-text p-0">
                <i class="pi pi-chevron-down text-lg"></i>
              </button>
            </div>
          </template>

          <template v-else>
            <NuxtLink
              :to="login.to"
              v-ripple
              class="flex items-center p-menubar-item-link"
            >
              <span :class="login.icon"></span>
              <span>{{ login.label }}</span>
            </NuxtLink>
          </template>
        </div>
      </template>
    </Menubar>
  </div>
</template>
<style src="./style.scss" lang="scss" scoped></style>
