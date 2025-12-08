<script lang="ts" setup>
import type { LoggedInUser } from "~~/server/DB/DTOs";

const emit = defineEmits(["signout"]);
const props = defineProps<{ user: LoggedInUser }>();
const { user } = props;
</script>
<template>
  <h5 class="py-3">Logged as</h5>
  <div class="flex flex-column justify-center grow gap-3 pb-12">
    <div class="w-full md:w-2/3 mx-auto p-3 border">
      <div class="row row-gap-3">
        <div class="col">
          <div class="flex justify-center text-center">
            <div class="flex flex-col justify-center">
              <div class="w-24 h-24">
                <SessionPicture class="max-h-full" :id="user.id"></SessionPicture>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="flex flex-col gap-3">
            <div class="text-left w-full">
              <h2>{{ user.firstName }} {{ user.lastName }}</h2>
              {{ user.mailAddress }}
            </div>
            <div class="text-center">
              <SignOutButton @signout="$emit('signout')"></SignOutButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="./style.scss" lang="scss"></style>
