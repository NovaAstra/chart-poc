<script setup lang="ts">
import { onMounted } from "vue";
import { Bar } from "../packages/plot"


onMounted(() => {
  const bar = new Bar("bar")

  bar.render()
})
</script>

<template>
  <div id="bar" style="width:100vw;height:100vh;"></div>
</template>

<style>

</style>