<script setup lang="ts">
setup({});
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { setup, getTasks, getUsers, getDirectUsers } from "./script";
const { data: tasks, status, error } = await getTasks();
const { data: users } = await getUsers();
const userList = ref(users);
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
    getDirectUsers().then((data) => {
      userList.value = data;
    });
  }

  isLoading.value = false;
};
function navigate(id: string) {
  return navigateTo({
    path: "/u/" + id,
  });
}
</script>
<template>
  <div>
    <article v-if="status === 'pending'" aria-busy="true"></article>
    <div class="error" v-else-if="status === 'error'">{{ error?.statusMessage }}</div>
   
    <article v-for="user in userList" :key="user.id">
      <h2>
        <Button @click="navigate(user.id!)"> {{ user.firstName }}</Button>
        <button class="small-button" rounded @click="deleteUser(user.id!)">x</button>
      </h2>
    </article>
  </div>
</template>
