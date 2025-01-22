<template>
  <div class="container">
    <div class="settings">
      <button class="btn" @click="$router.go(-1)">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.7898 7.41005C18.3365 7.95678 18.3365 8.84322 17.7898 9.38995L13.1797 14L17.7898 18.6101C18.3365 19.1568 18.3365 20.0432 17.7898 20.5899C17.243 21.1367 16.3566 21.1367 15.8099 20.5899L10.2099 14.9899C9.66312 14.4432 9.66312 13.5568 10.2099 13.0101L15.8099 7.41005C16.3566 6.86332 17.243 6.86332 17.7898 7.41005Z"
            fill="white"
          />
        </svg>
      </button>

      <h1>{{ $t('settings') }}</h1>
      <hr />
      <h6>{{ $t('round_duration') }}</h6>
      <div class="time-settings">
        <button @click="decreaseTime" class="btn">
          <svg
            width="36"
            height="9"
            viewBox="0 0 36 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.5 -1.96701e-07C33.9853 -8.80662e-08 36 2.01472 36 4.5C36 6.98528 33.9853 9 31.5 9L4.5 9C2.01472 9 -3.05336e-07 6.98528 -1.96701e-07 4.5C-8.80662e-08 2.01472 2.01472 -1.48554e-06 4.5 -1.37691e-06L31.5 -1.96701e-07Z"
              fill="#FFD106"
            />
          </svg>
        </button>
        <span>{{ formattedTime }}</span>
        <button @click="increaseTime" class="btn">
          <svg
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 3V30M29.5 16.5L2.5 16.5"
              stroke="#FFD106"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>


    </div>
  </div>
</template>

<script setup>

import { useGameSettingsStore } from '@/stores/gameSettings'
import { computed } from 'vue'

const gameSettings = useGameSettingsStore()

// Форматируем время в минуты:секунды
const formattedTime = computed(() => {
  const minutes = Math.floor(gameSettings.gameTime / 60)
  const seconds = gameSettings.gameTime % 60
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
})
const decreaseTime = () => {
  gameSettings.decreaseTime()
}
const increaseTime = () => {
  gameSettings.increaseTime()
}
</script>
