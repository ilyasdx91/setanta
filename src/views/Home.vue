<template>
  <div class="container">
    <Header />
    <div v-if="!videoEnded" class="welcome">
      <div class="video-background">
        <img src="@/assets/welcome.gif" alt="" style="display: inline-block;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);" />
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
  if (sessionStorage.getItem('videoWatched') === 'true') {
    videoEnded.value = true
  } else {
    setTimeout(handleVideoEnd, 6000)
  }
})

// Обработчик для события "ended" у видео
const handleVideoEnd = () => {
  videoEnded.value = true
  sessionStorage.setItem('videoWatched', 'true') // Сохраняем состояние в sessionStorage
}
</script>
