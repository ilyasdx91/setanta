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
  
        <h1>{{ $t('change_language') }}</h1>
        <hr />

  
        <LanguageSwitcher @language-changed="onLanguageChanged" />
      </div>
    </div>
  </template>
  
  <script setup>
  import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
  import { useCategoriesStore } from '@/stores/categories.js'

  const categoriesStore = useCategoriesStore()
  
  const onLanguageChanged = (newLocale) => {
    categoriesStore.clearCategories()
    categoriesStore.fetchCategories()
    console.log(newLocale)
  }
  </script>
  