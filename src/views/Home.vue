<template>
  <Header />
  <div class="container">
    <div v-if="!videoEnded" class="welcome">
      <div class="video-background">
        <video autoplay muted @ended="handleVideoEnd" id="myVideo">
          <source src="@/assets/welcome.mp4" type="video/mp4" />
          <source src="@/assets/welcome.mov" type="video/mov" />
        </video>
      </div>
    </div>
    <div v-if="videoEnded" class="categories">
      <h2>Categories</h2>
      <ul>
        <li v-for="(item, index) in 7" :key="index">
          <div class="item">
            <img src="@/assets/img/image.png" alt="" />
            <p>Sport trophies</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Создаем реактивное состояние для отслеживания, завершилось ли видео
const videoEnded = ref(false)

// Обработчик для события "ended" у видео
const handleVideoEnd = () => {
  videoEnded.value = true
}
</script>
