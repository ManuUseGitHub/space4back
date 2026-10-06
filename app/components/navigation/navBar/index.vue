<script lang="ts" setup>
import { ref } from "vue";
import { applyProfile, forceRerender, getUserMenuComposition, loadProfile, menuItems } from "./script";
const colorMode = useColorMode();
const route = useRoute();
const principal = useCurrentUser();
const roles = ref<string[]>([]);
const renderComponent = ref(true);
const userMenuRef = ref();
const userMenu = ref(getUserMenuComposition(() => {handleLogout()}));

const handleLogout = async () => {
  await signout();
  await loadProfile(principal, userMenu);
  location.reload();
  setTimeout(() => forceRerender(renderComponent), 3000);
};
const loginUrl = `/syngularity/connexion?url=/${useSegments("bougs", route.path)}`;
const login = {
  label: "Connect",
  icon: "pi pi-user",
  to: useExternalUrlResolver(loginUrl),
};

const userId = computed(() => {
  return principal.value.userId;
});

const isAdmin = computed(() => {
  return roles.value && roles.value.length && roles.value!.includes("admin");
});
const items = ref(menuItems(colorMode, isAdmin));

onMounted(() => applyProfile(principal, roles, userMenu));
</script>

<template v-if="renderComponent">
  <div class="sticky-menubar">
    <Menubar :model="items">
      <template #start class="flex-1">
        <img
          v-if="colorMode.preference == 'light'"
          src="/img/bougs-b-cookie.png"
          alt=""
          class="h-8!"
        />
        <img else src="/img/bougs-b.png" alt="" class="h-8!" />
      </template>
      <template #item="{ item, props, root }">
        <NavLink
          v-if="item.condition ? item.condition() : true"
          :props="props"
          :item="item"
          :root="root"
        />
      </template>
      <template #end>
        <div class="flex items-center gap-2 p-menubar-root-list h-8">
          <template v-if="principal">
            <span> {{ principal.firstName }}</span>

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
