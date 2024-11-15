<template>
  <div class="game-container">
    <begin-game @countdownFinished="showQuestions" v-if="!showQuiz" />
    <quiz-questions v-else :questions="questions" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BeginGame from '@/components/BeginGame.vue'
import QuizQuestions from '@/components/QuizQuestions.vue'

const showQuiz = ref(false)

const questions = ref([
  { id: 1, question: 'Что это?' },
  { id: 2, question: 'Где это?' },
  { id: 3, question: 'Как это?' },
])

const showQuestions = () => {
  showQuiz.value = true // Показать викторину после завершения отсчета
}

//====================================

onMounted(() => {
  // Принудительно переворачиваем страницу в горизонтальную ориентацию
  document.body.classList.add('game-landscape')
  console.log('game-landscape class added')
})

onBeforeUnmount(() => {
  // Убираем стиль при выходе с игры
  document.body.classList.remove('game-landscape')
  console.log('game-landscape class removed')
})
</script>

<style scoped>
.game-container {
  width: 100%;
  height: 100%;
}

/* Стиль для страницы Game в горизонтальном виде */
.game-landscape .game-container {
  /* transform: rotate(90deg);
  transform-origin: top left;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;  */
}

/* Можно добавить другие стили, чтобы элементы на странице выглядели корректно */
</style>
