<template>
  <category-header></category-header>

  <div class="category">
    <!--    <img :src="constants.BaseUrl + categoriesStore.category.image" alt="" />-->
    <div class="title">
      <h1>{{ categoriesStore.category.name }}</h1>
    </div>
    <div class="inner">
      <button class="btn btn-yellow" @click="onStartClick">
        {{ $t('start') }}
      </button>
      <!--      <p v-html="categoriesStore.category.description"></p>-->
      <!--      <router-link :to="{ name: 'Game' }" class="btn btn-yellow">
              {{ $t('start') }}
            </router-link>-->
    </div>
  </div>
</template>

<script setup>
//import constants from '../constants.js'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
//import { reactive, onMounted, onUnmounted, ref } from 'vue'
import CategoryHeader from '@/components/CategoryHeader.vue'
import { useCategoriesStore } from '@/stores/categories.js'
//import { useGameSettingsStore } from '@/stores/gameSettings'
//const gameSettings = useGameSettingsStore()
import { initAudioContext } from '@/audio.js'

const route = useRoute()
const router = useRouter()
const categoriesStore = useCategoriesStore()
//const audioCtx = getAudioContext()

onMounted(async () => {
  categoriesStore.clearCategory()
  await categoriesStore.fetchCategory(route.params.id)
  // if (gameSettings.sounds) {
  //   const audio = new Audio(new URL('@/assets/sounds/right.mp3', import.meta.url).href)
  //   audio.play()
  // }
})

const onStartClick = () => {
  initAudioContext()
  router.push({ name: 'Game' })
}
</script>
