<template>
  <div class="quiz-container">
    <div v-if="currentQuestion" class="quiz">
      <header>
        <router-link :to="{ name: 'Category', params: { id: 1 } }">
          {{ $t('back') }}
        </router-link>
        <div class="info">
          <div>{{ questionProgress }}</div>
          <div class="timer">{{ formattedTime }}</div>
        </div>
      </header>
      <main>
        <p v-if="incorrectPosition">{{ $t('incorrect_position') }}</p>
        <p v-else>{{ currentQuestion.question }}</p>
      </main>
      <footer>
        <router-link :to="{ name: 'Category', params: { id: 1 } }">
          {{ $t('finish') }}
        </router-link>
      </footer>
    </div>
    <div v-else class="end-screen">
      <h2>{{ $t('quiz_complete') }}</h2>
      <p>
        {{ $t('score', { correct: correctAnswers, total: totalQuestions }) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import useTimer from '@/composables/useTimer'
import useDeviceOrientation from '@/composables/useDeviceOrientation'

// Логика игры
const props = defineProps({ questions: Array })
const currentIndex = ref(0)
const correctAnswers = ref(0)
const totalQuestions = ref(props.questions.length)

const currentQuestion = computed(() => props.questions[currentIndex.value])
const questionProgress = computed(
  () => `${currentIndex.value + 1}/${totalQuestions.value}`,
)

// Таймер
const { timeLeft, formattedTime, startTimer, stopTimer } = useTimer(30)

// Логика ориентации
const { gamma, incorrectPosition } = useDeviceOrientation()

// Инициализация игры
onMounted(() => startTimer())
onBeforeUnmount(() => stopTimer())
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: calc(100vh - 70px);

  .question-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    font-size: 16px;
    font-weight: 700;

    .btn {
      display: flex;
      align-items: center;
      text-transform: uppercase;

      i {
        margin-right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .right {
      display: flex;
      align-items: center;

      .cards {
        display: flex;
        align-items: center;
        margin-right: 30px;
        opacity: 0.3;

        i {
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  .question {
    position: relative;

    .answer-status {
      position: absolute;
      top: -60px;
      left: 50%;
      margin-left: -30px;
    }

    p {
      font-weight: 700;
      font-size: 60px;
      color: #fdd106;
      text-align: center;
    }

    .notice {
      font-weight: 600;
      font-size: 20px;
    }

    .checkmark {
      color: #4cd964;
    }

    .cross {
      color: #fc5f55;
    }
  }

  .question-footer {
    padding: 20px;

    .btn {
      display: block;
      font-size: 28px;
      font-weight: 700;
      color: #fdd106;
      text-align: center;
      text-transform: uppercase;
    }
  }
}

.end-message {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 100vh;
  padding: 20px 0;

  .msg {
    text-align: center;
    color: #fff;

    i {
      font-size: 56px;
      font-style: normal;
    }

    h6 {
      font-size: 28px;
      font-weight: 700;
      margin: 5px 0;
    }

    p {
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
