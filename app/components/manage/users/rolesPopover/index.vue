<script lang="ts" setup>
import { ROLES } from "~~/server/utils/enums";
import { getRoleSeverity } from ".";
const op = ref();
const rols = ref<any[][]>();

const { user } = defineProps<{ user: { role: string[]; id: string } }>();

const invariableRoles = ref<string[]>([]);
const tempRoles = ref<string[]>([]);
const diffAddRoles = ref<string[]>([]);
const diffRemoveRoles = ref<string[]>([]);
const snapshotRoles = ref<string[]>([]);

const addSuperAdminInvariableRole = () => {
  const superAdminRole = user.role.find((x) => x == ROLES.SUPER_ADMIN);
  if (superAdminRole) {
    invariableRoles.value.push(superAdminRole);
  }
};

const isTempDifferent = computed(() => {
  return JSON.stringify(snapshotRoles.value) != JSON.stringify(tempRoles.value);
});

const computeLists = () => {
  const effectives = user.role.filter((x) => x != ROLES.SUPER_ADMIN);
  addSuperAdminInvariableRole();

  const reserve = Object.values(ROLES)
    .filter((x) => x != ROLES.SUPER_ADMIN)
    .filter((x) => !effectives.includes(x));

  snapshotRoles.value = effectives;
  tempRoles.value = effectives;

  diffAddRoles.value = [];
  diffRemoveRoles.value = [];

  rols.value = [reserve, effectives];
};

onMounted(() => {
  computeLists();
});

const move = (event: any) => {
  if (rols.value) {
    tempRoles.value = rols.value[1]!;
    diffAddRoles.value = tempRoles.value.filter((x) => !snapshotRoles.value.includes(x));
    diffRemoveRoles.value = snapshotRoles.value.filter(
      (x) => !tempRoles.value.includes(x)
    );
  }
};

const isForRemove = (role: string) => {
  return diffRemoveRoles.value.includes(role);
};
const cancelChanges = () => {
  computeLists();
};

const applyChanges = () => {
  user.role = Array.from(new Set([...tempRoles.value, ...invariableRoles.value]));
  $fetch("/api/userRoles/" + user.id, {
    method: "PUT",
    body: { roles: user.role },
  }).then(() => {
    {
      computeLists();
      op.value.hide();
    }
  });
};

const displayRoles = (event: any) => {
  op.value.hide();

  nextTick(() => {
    op.value.show(event);
  });
};
</script>
<template>
  <div class="d-flex gap-2">
    <template v-if="user.role.length" v-for="role in user.role">
      <Tag v-if="!isForRemove(role)" :severity="getRoleSeverity(role)">{{ role }}</Tag>
      <Tag v-else severity="secondary" class="for-remove text-red-500!">{{ role }}</Tag>
      <OverlayBadge v-if="isForRemove(role)" severity="danger" value=""> </OverlayBadge>
    </template>

    <Tag v-else severity="secondary">
      <span :class="icons.pEyeSlash" class="text-red-600!"> </span>
    </Tag>
    <template v-if="diffAddRoles.length" v-for="role in diffAddRoles">
      <Tag severity="secondary" class="opacity-30">{{ role }}</Tag>
      <OverlayBadge v-if="isTempDifferent" severity="success" value=""> </OverlayBadge>
    </template>
    <Button
      severity="secondary"
      :icon="icons.pList"
      @click="displayRoles($event)"
      rounded
    ></Button>
    <OverlayBadge v-if="isTempDifferent" severity="danger" value=""> </OverlayBadge>
    <Popover ref="op" class="roles-picker">
      <PickList
        v-model="rols"
        :sourceHeader="'source'"
        :targetHeader="'target'"
        :showSourceControls="false"
        :showTargetControls="false"
        @move-to-target="move"
        @move-to-source="move"
      >
        <template #option="{ option, selected }">
          <Tag :severity="getRoleSeverity(option)" class=" min-w-fit">{{ option }}</Tag>
        </template>
      </PickList>
      <hr />
      <div class="d-flex gap-3 justify-center">
        <Button severity="primary" @click="applyChanges" :icon="icons.pSave"></Button>
        <Button severity="danger" @click="cancelChanges">Cancel test</Button>
      </div>
    </Popover>
  </div>
</template>
<style src="./style.scss" lang="scss"></style>
