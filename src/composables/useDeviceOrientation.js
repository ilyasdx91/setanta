import { ref, onMounted, onBeforeUnmount } from 'vue'

export default function useDeviceOrientation() {
  const gamma = ref(0)
  const incorrectPosition = ref(false)

  const handleDeviceOrientation = event => {
    gamma.value = event.gamma || 0
    incorrectPosition.value = Math.abs(gamma.value) > 30 // Пример условия
  }

  onMounted(() => {
    window.addEventListener('deviceorientation', handleDeviceOrientation)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('deviceorientation', handleDeviceOrientation)
  })

  return { gamma, incorrectPosition }
}
