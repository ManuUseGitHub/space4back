<script lang="ts" setup>
import type { SectorEntity } from '~~/server/DB/entity/interfaces';

    defineProps<{ sector:SectorEntity; i:number; vignette:string }>();
    defineExpose(["show"])
</script>
<template>
    <div class="d-flex justify-center py-14 flex-wrap">
          <div class="col md:ml-14 max-w-fit d-flex border sector-tag" :class="'t-' + i">
            <div class="max-w-fit">
              <h3 class="vertical-text text-white p-2">
                sector {{ getRomanCount(i + 1) }}
              </h3>
            </div>
            <div class="h-80 min-w-80 vignette border">
              <img :src="'img/sectors/' + vignette" alt="" />
            </div>
          </div>

          <div class="col w-full text-center p-3 mx-14 thumb">
            <div class="d-flex flex-col">
              <h1 class="min-w-sm text-nowrap">{{ sector.name }}</h1>
              <p>{{ sector.description }}</p>
              <hr />
              <div class="d-flex justify-center">
                <div class="max-w-fit d-flex items-start flex-col">
                  <p class="md:max-w-sm text-left">
                    {{ sector.comment }}
                  </p>
                  <div>
                    <Button class="pushedButton" severity="secondary" @click="$emit('show',i)"> View activities  </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>