<template>
  <div class="quiz-container">
    <div v-if="currentQuestion" class="question-wrap" @click="handleClick">
      <div class="question-head">
        <button class="btn">
          <i>
            <svg
              width="10"
              height="14"
              viewBox="0 0 10 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.78976 0.410051C9.33649 0.956784 9.33649 1.84322 8.78976 2.38995L4.1797 7L8.78976 11.6101C9.33649 12.1568 9.33649 13.0432 8.78976 13.5899C8.24302 14.1367 7.35659 14.1367 6.80986 13.5899L1.20986 7.98995C0.663121 7.44322 0.663121 6.55678 1.20986 6.01005L6.80986 0.410051C7.35659 -0.136683 8.24302 -0.136684 8.78976 0.410051Z"
                fill="white"
              />
            </svg>
          </i>
          BACK
        </button>
      </div>

      <div class="question">
        <div v-if="answerStatus === 'correct'" class="answer-status">
          <span class="checkmark">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.5 30L27.5 35L37.5 25M52.5 30C52.5 42.4264 42.4264 52.5 30 52.5C17.5736 52.5 7.5 42.4264 7.5 30C7.5 17.5736 17.5736 7.49997 30 7.49997C42.4264 7.49997 52.5 17.5736 52.5 30Z"
                stroke="#4CD964"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
        <div v-if="answerStatus === 'incorrect'" class="answer-status">
          <span class="cross">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 35.0001L30 30.0001M30 30.0001L35 25.0001M30 30.0001L25 25.0001M30 30.0001L35 35.0001M52.5 30.0001C52.5 42.4265 42.4264 52.5001 30 52.5001C17.5736 52.5001 7.5 42.4265 7.5 30.0001C7.5 17.5737 17.5736 7.50012 30 7.50012C42.4264 7.50012 52.5 17.5737 52.5 30.0001Z"
                stroke="#FC5F55"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
        <p :style="{ color: currentAnswerColor }">
          {{ currentQuestion.question }}
        </p>
      </div>

      <div class="question-footer">
        progress-bar
        <button class="btn">FINISH</button>
      </div>
    </div>

    <div v-else class="end-message">
      <p>Викторина завершена!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  questions: {
    type: Array,
    required: true,
  },
})

const currentQuestion = ref(null)
const currentAnswerColor = ref('#FFD106')
const answerStatus = ref('') // 'correct' | 'incorrect' | ''

let currentIndex = 0

const showNextQuestion = () => {
  if (currentIndex < props.questions.length) {
    currentQuestion.value = props.questions[currentIndex]
    answerStatus.value = ''
    currentAnswerColor.value = '#FFD106'
    currentIndex++
  } else {
    currentQuestion.value = null // Завершаем викторину
  }
}

onMounted(() => {
  showNextQuestion() // Показываем первый вопрос
  //window.addEventListener('deviceorientation', checkOrientation) // Добавляем слушатель события наклона устройства
})

// Функция для обработки кликов
const handleClick = event => {
  const position =
    event.clientY < window.innerHeight / 2 ? 'correct' : 'incorrect'
  if (position === 'correct') {
    answerStatus.value = 'correct'
    currentAnswerColor.value = '#4CD964'
  } else {
    answerStatus.value = 'incorrect'
    currentAnswerColor.value = '#FC5F55'
  }
  setTimeout(showNextQuestion, 1000) // Задержка перед следующим вопросом
}

// Обработка наклона устройства
// const checkOrientation = event => {
//   const alpha = event.alpha
//   if (alpha < 180) {
//     // Наклон вверх (правильный ответ)
//     answerStatus.value = 'correct'
//     currentAnswerColor.value = 'green'
//     setTimeout(showNextQuestion, 1000) // Задержка перед следующим вопросом
//   } else {
//     // Наклон вниз (неправильный ответ)
//     answerStatus.value = 'incorrect'
//     currentAnswerColor.value = 'red'
//     setTimeout(showNextQuestion, 1000) // Задержка перед следующим вопросом
//   }
// }

onBeforeUnmount(() => {
  // window.removeEventListener('deviceorientation', checkOrientation) // Убираем слушатель перед уничтожением компонента
})
</script>

<style scoped lang="scss">
.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.question-wrap {
  font-size: 32px;
  font-weight: bold;
  margin-top: 40px;
  cursor: pointer;
}

.answer-status {
  margin-top: 20px;
  font-size: 48px;
}

.checkmark {
  color: #4cd964;
}

.cross {
  color: #fc5f55;
}

.end-message {
  font-size: 24px;
  color: #333;
}

.quiz-container div {
  width: 100%;
  height: 50%;
  text-align: center;
}
</style>
