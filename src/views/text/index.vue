<template lang="pug">
div.w-p100.h-p100
  div.w-p100.h-p100.ovfl-hd(ref="rootRef")
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
const rootRef = ref(null);
import mockData from '../scene/mock'
import {Scene} from "@/views/scene/index";

onMounted(() => {
  init();
});
let scene: Scene;
const init = () => {
  const container = rootRef.value;
  if (!container) return;
  scene = new Scene({
    width: container.offsetWidth,
    height: container.offsetHeight,
    rootDom: container,
    options: mockData,
  })
}
</script>

<style scoped>

</style>