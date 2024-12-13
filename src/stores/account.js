import { defineStore } from 'pinia'
import axios from '@/axios.js'

export const useAccountStore = defineStore('account', {
  state: () => ({
    telegramData: {
      query_id: '',
      user: null,
      receiver: null,
      chat_type: '',
      chat_instance: '',
      auth_date: 0,
      hash: '',
      signature: ''
    },
    contentSafeAreaInset: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    categoryAttempt: {
      attempt_id: '',
      player_id: '',
      category_id: '',
      start_at: '',
      updated_at: '',
      created_at: ''
    },
    loading: false,
    error: null
  }),
  actions: {
    async initByTelegram(tgInitData) {
      this.telegramData = tgInitData
    },
    async setSafeArea(contentSafeAreaInset) {
      this.contentSafeAreaInset = contentSafeAreaInset
    },
    async createAttempt(categoryId) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('start-new-attempt', {
          category_id: categoryId,
          init_data: this.telegramData
        })
        if (response.data.success) {
          this.categoryAttempt = response.data.data
        } else {
          this.error = 'Ошибка на сервере: данные не получены.'
        }
      } catch (err) {
        this.error = 'Ошибка при подключении к серверу'
      } finally {
        this.loading = false
      }
    }
  }
})
