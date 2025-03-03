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
import { onMounted, ref } from 'vue'
//import { reactive, onMounted, onUnmounted, ref } from 'vue'
import CategoryHeader from '@/components/CategoryHeader.vue'
import { useCategoriesStore } from '@/stores/categories.js'
//import { useGameSettingsStore } from '@/stores/gameSettings'
//const gameSettings = useGameSettingsStore()

const route = useRoute()
const router = useRouter()
const categoriesStore = useCategoriesStore()

onMounted(async () => {
  categoriesStore.clearCategory()
  await categoriesStore.fetchCategory(route.params.id)
  // if (gameSettings.sounds) {
  //   const audio = new Audio(new URL('@/assets/sounds/right.mp3', import.meta.url).href)
  //   audio.play()
  // }
})

const onStartClick = () => {
  const gainNode = this.audioCtx.createGain()
  gainNode.gain.value = 1
  console.log('unlocking')
  // create empty buffer and play it
  const buffer = this.audioCtx.createBuffer(1, 1, 22050)
  const source = this.audioCtx.createBufferSource()
  source.buffer = buffer
  source.connect(this.audioCtx.destination)
  // play the file. noteOn is the older version of start()
  source.start ? source.start(0) : source.noteOn(0)

  // by checking the play state after some time, we know if we're really unlocked
  setTimeout(function() {
    if ((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
      //
    }
  }, 0)

  router.push({ name: 'Game' })
  //const AudioContext = window.AudioContext || window.webkitAudioContext
  //const context = new AudioContext()
  // play the file. noteOn is the older version of start()
  //source.start ? source.start(0) : source.noteOn(0);
}
</script>
