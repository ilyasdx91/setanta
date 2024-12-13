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
  await accountStore.initByTelegram(telegram.initDataUnsafe)
  await accountStore.setSafeArea(telegram.ContentSafeAreaInset)
  try {
    //telegram.showAlert(accountStore.telegramData.user.first_name);
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
