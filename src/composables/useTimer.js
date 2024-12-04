import { ref, computed } from 'vue'

export default function useTimer(initialTime) {
  const timeLeft = ref(initialTime)
  let timerInterval = null

  const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
    const seconds = timeLeft.value % 60
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  })

  const startTimer = () => {
    timerInterval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        stopTimer()
        // Здесь можно добавить логику завершения игры
      }
    }, 1000)
  }

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  return { timeLeft, formattedTime, startTimer, stopTimer }
}
