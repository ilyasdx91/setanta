<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

let wakeLock = null

onMounted(async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen')
  } catch (err) {
    console.log(err)
  }
})
onUnmounted(() => {
  wakeLock.release().then(() => {
    wakeLock = null
  })
})
</script>
