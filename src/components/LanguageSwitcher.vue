<template>
  <div class="language-switcher">
    <h6>
      {{ $t('change_language') }}

      <img v-if="locale === 'en'" :src="constants.BaseGameUrl +'/flags/us.svg'" :alt="us" />
      <img v-else :src="constants.BaseGameUrl +'/flags/ua.svg'" :alt="ua" />
    </h6>
    <hr />
    <div class="language-options">
      <button
        v-for="lang in languages"
        :key="lang.code"
        class="language-button"
        :class="{ active: lang.code === currentLocale }"
        @click="setLanguage(lang.code)"
      >
        <img :src="lang.flag" :alt="lang.label" class="flag" />
        <span>{{ lang.label }}</span>
        <span v-if="lang.code === currentLocale" class="checkmark">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 24.5C18.6274 24.5 24 19.1274 24 12.5C24 5.87258 18.6274 0.5 12 0.5C5.37258 0.5 0 5.87258 0 12.5C0 19.1274 5.37258 24.5 12 24.5ZM17.5607 10.5607C18.1464 9.97487 18.1464 9.02513 17.5607 8.43934C16.9749 7.85355 16.0251 7.85355 15.4393 8.43934L10.5 13.3787L8.56066 11.4393C7.97487 10.8536 7.02513 10.8536 6.43934 11.4393C5.85355 12.0251 5.85355 12.9749 6.43934 13.5607L9.43934 16.5607C10.0251 17.1464 10.9749 17.1464 11.5607 16.5607L17.5607 10.5607Z"
              fill="#4CD964"
            />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGameSettingsStore } from '@/stores/gameSettings'
import constants from '../constants.js'

const { locale } = useI18n()
const gameSettings = useGameSettingsStore()

const emit = defineEmits(['languageChanged'])

const languages = [
  { code: 'en', label: 'English (US)', flag: `${constants.BaseGameUrl}/flags/us.svg` },
  { code: 'ua', label: 'Українська', flag: `${constants.BaseGameUrl}/flags/ua.svg` }
]

const setLanguage = lang => {
  if (lang !== locale.value) {
    emit('languageChanged', lang)
  }
  locale.value = lang // Устанавливаем язык для i18n
  localStorage.setItem('locale', lang) // Сохраняем выбранный язык в localStorage
  gameSettings.setLanguage(lang) // Сохраняем в глобальные настройки, если это нужно
}

const currentLocale = locale

// При загрузке компонента устанавливаем язык из localStorage
onMounted(() => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    locale.value = savedLocale // Устанавливаем сохраненный язык
  }
})
</script>

<style scoped lang="scss">
.language-switcher {
  color: white;
}

.language-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.language-button {
  display: flex;
  align-items: center;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  padding: 16px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  position: relative;

  .flag {
    width: 32px;
    height: 24px;
    margin-right: 16px;
  }

  .checkmark {
    position: absolute;
    top: 50%;
    right: 16px;
    width: 24px;
    height: 25px;
    margin-top: -12px;
  }

  &.active {
    border: 1px solid rgba(255, 255, 255, 1);
  }
}
</style>
