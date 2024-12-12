<template>
  <div class="container">
    <Header />
    <div v-if="!videoEnded" class="welcome">
      <div class="video-background">
        <video autoplay muted @ended="handleVideoEnd" id="myVideo">
          <source src="@/assets/welcome.mp4" type="video/mp4" />
          <source src="@/assets/welcome.mov" type="video/mov" />
        </video>
      </div>
    </div>
    <div v-if="videoEnded" class="categories">
      <h2>{{ $t('categories') }}</h2>
      <ul>
        <li v-for="(item, index) in categoriesStore.categories" :key="index">
          <router-link
            class="item"
            :to="{ name: 'Category', params: { id: item.id } }"
          >
            <img :src="constants.BaseUrl + item.image" alt="" />
            <p>{{ item.name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import constants from '../constants.js'
import { useCategoriesStore } from '@/stores/categories'
import { ref, onMounted } from 'vue'

const categoriesStore = useCategoriesStore()

// Создаем реактивное состояние для отслеживания, завершилось ли видео
const videoEnded = ref(false)

onMounted(() => {
  categoriesStore.fetchCategories()
  const isVideoWatched = sessionStorage.getItem('videoWatched') === 'true'
  if (isVideoWatched) {
    videoEnded.value = true
  }
})

// Обработчик для события "ended" у видео
const handleVideoEnd = () => {
  videoEnded.value = true
  sessionStorage.setItem('videoWatched', 'true') // Сохраняем состояние в sessionStorage
}

const telegram = window.Telegram.WebApp
const telegramData = telegram.initDataUnsafe
</script>
