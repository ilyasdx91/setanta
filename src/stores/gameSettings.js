import { defineStore } from 'pinia'

export const useGameSettingsStore = defineStore('gameSettings', {
  state: () => ({
    gameTime: 60, // Время по умолчанию в секундах (30 секунд)
    language: 'en', // Язык по умолчанию
    sounds: true, // Язык по умолчанию
  }),
  actions: {
    switchSounds(){
      this.sounds = !this.sounds
    },
    // Уменьшаем время на 10 секунд, не ниже 20
    decreaseTime() {
      if (this.gameTime > 20) {
        this.gameTime -= 10
      }
    },
    // Увеличиваем время на 10 секунд
    increaseTime() {
      this.gameTime += 10
    },
    // Устанавливаем конкретное время
    setGameTime(timeInSeconds) {
      this.gameTime = timeInSeconds
    },
    //========
    setLanguage(lang) {
      this.language = lang
    },
  },
})
