<script setup lang="ts">
import managers from "~/middleware/managers";
import auth from "~/middleware/auth";
definePageMeta({
  middleware: [managers, auth],
});

setup({});

import { useToast } from "primevue/usetoast";
const toast = useToast();
import { setup, loadUsers } from "./script";
import type { UserEntity } from "~~/server/DB/entity/interfaces";

const userList = ref();
const isLoading = ref(false);

const deleteUser = async (id: string) => {
  isLoading.value = true;
  const result = await $fetch("/api/user/" + id, {
    method: "DELETE",
  }).catch((e) => {
    toastError(toast, e.errorMessage);
  });
  if (result) {
    toastSuccess(toast, `${result}`);
    userList.value = await loadUsers(toast);
  }

  isLoading.value = false;
};
const roles = ref<string[]>();
const idAdmin = ref<string>();
const op = ref();

const selectedUser = ref();
const testVales = ref([["test"], []]);

const displayUser = (event: any, user: UserEntity) => {
  op.value.hide();

  if (selectedUser.value?.id === user.id) {
    selectedUser.value = null;
  } else {
    selectedUser.value = user;

    nextTick(() => {
      op.value.show(event);
    });
  }
};

const ageInfos = (user: UserEntity) => {
  return user.birthDate ? `${user.birthDate} years old` : "";
};

const hidePopover = () => {
  op.value.hide();
};
onMounted(async () => {
  const user = await $fetch("/api/connexion/iam/");
  if (user != null) {
    roles.value = user.role;
    idAdmin.value = user.id;
  }
  userList.value = await loadUsers(toast);
});

function navigate(id: string) {
  return navigateTo({
    path: "/u/" + id,
  });
}
</script>
<template>
  <DataTable :value="userList" tableStyle="min-width: 50rem">
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="text-xl font-bold">Manage users</span>
        <Button severity="primary" icon="pi pi-refresh" rounded raised />
      </div>
    </template>
    <Column field="name" header="Name">
      <template #body="slotProps">
        {{ slotProps.data.firstName }} {{ slotProps.data.lastName }}
      </template>
    </Column>

    <Column header="Image">
      <template #body="slotProps">
        <div class="relative">
          <SessionPicture
            :id="slotProps.data.id"
            class="max-w-10 border d-inline-block"
          />
          <Button
            @click="displayUser($event, slotProps.data)"
            class="teaser-button"
            icon="pi pi-search"
            rounded
          ></Button>
        </div>
      </template>
    </Column>
    <Column header="Roles">
      <template #body="slotProps">
        <RolesPopover :user="slotProps.data"></RolesPopover>
      </template>
    </Column>
    <Column header="Status">
      <template #body="slotProps">
        <Tag :value="slotProps.data.inventoryStatus" :severity="'danger'"
          >Disconnected</Tag
        >
        <span
          :class="icons.pExclamationCircle"
          class="text-orange-400!"
          v-tooltip="'not implemented'"
        ></span>
      </template>
    </Column>
    <Column header="Action">
      <template #body="slotProps">
        <div class="d-flex gap-2">
          <button @click="navigate(slotProps.data.id)">
            <span class="text-blue-400!" :class="icons.pUser"></span>
          </button>
          <button
            v-if="!slotProps.data.role.includes('admin')"
            class="small-button"
            rounded
            @click="deleteUser(slotProps.data.id!)"
          >
            <span class="text-red-600!" :class="icons.pTrash"></span>
          </button>
          <button disabled v-else>
            <span :class="icons.pTrash"></span>
          </button>
        </div>
      </template>
    </Column>
    <template #footer> {{ userList ? userList.length : 0 }} users. </template>
  </DataTable>
  <Popover ref="op">
    <div v-if="selectedUser" class="rounded">
      <div class="d-flex gap-3">
        <div class="col max-w-fit">
          <SessionPicture :id="selectedUser.id" class="max-w-40 border d-inline-block" />
        </div>
        <div class="col">
          <h3 class="min-w-fit">
            {{ selectedUser.firstName }} {{ selectedUser.lastName }}
          </h3>
          <ul>
            <li>Gender <span :class="getGender(selectedUser.gender)"></span></li>
            <li>Title {{ selectedUser.title }}</li>
            <li><span :class="icons.pAt" /> {{ selectedUser.enterprise }}</li>
            <li>{{ ageInfos(selectedUser) }}</li>
          </ul>
        </div>
      </div>
    </div>
  </Popover>
</template>
<style lang="scss">
.teaser-button {
  position: absolute;
  left: 0;
  background: transparent;
  border: none;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    background: #ffffff77;
    opacity: 1;
  }
}

.p-picklist-controls.p-picklist-transfer-controls button:nth-child(even) {
  display: none;
}
</style>
