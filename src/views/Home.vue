<template>
  <div class="container">
    <Header />
    <div v-if="!videoEnded" class="welcome">
      <div class="video-background">
        <img src="@/assets/welcome.gif" alt="" />
        <!--<video autoplay muted @ended="handleVideoEnd" id="myVideo">
                  <source src="@/assets/welcome.mp4" type="video/mp4" />
                  <source src="@/assets/welcome.mov" type="video/mov" />
                </video>-->
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
import { onMounted, ref } from 'vue'

const categoriesStore = useCategoriesStore()

// Создаем реактивное состояние для отслеживания, завершилось ли видео
const videoEnded = ref(false)

onMounted(() => {
  if (categoriesStore.categories.length === 0) {
    categoriesStore.fetchCategories()
  }
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

setTimeout(handleVideoEnd(), 6000)
</script>
