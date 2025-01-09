<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useAccountStore } from '@/stores/account.js'

let wakeLock = null
const accountStore = useAccountStore()
const telegram = window.Telegram.WebApp

onMounted(async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen')
  } catch (err) {
    console.log(err)
  }
  try {
    await accountStore.initByTelegram(telegram.initDataUnsafe)
  } catch (e) {
    console.log(e)
  }
  try {
    await accountStore.setSafeArea(telegram.ContentSafeAreaInset)
  } catch (e) {
    console.log(e)
  }
})
onUnmounted(() => {
  wakeLock.release().then(() => {
    wakeLock = null
  })
})
</script>
