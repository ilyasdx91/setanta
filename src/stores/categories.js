import { defineStore } from 'pinia'
import axios from '@/axios'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [],
    category: {
      id: null,
      name: '',
      description: '',
      image: null,
      order: 0
    },
    questions: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchCategories() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('categories')
        if (response.data.success) {
          this.categories = response.data.data.items.map(item => ({
            id: item.category_id,
            name: item.title,
            image: item.photo
          }))
        } else {
          this.error = 'Ошибка на сервере: данные не получены.'
        }
      } catch (err) {
        this.error = 'Ошибка при подключении к серверу'
      } finally {
        this.loading = false
      }
    },
    async fetchCategory(categoryId) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`categories/${categoryId}`)
        this.category = {
          id: response.data.data.category_id,
          name: response.data.data.title,
          description: response.data.data.description,
          image: response.data.data.photo,
          order: response.data.data.order
        }
      } catch (err) {
        this.error = 'Ошибка при подключении к серверу'
      } finally {
        this.loading = false
      }
    },
    async fetchQuestions(categoryId) {
      this.loading = true
      try {
        const response = await axios.get(
          `/get-questions-by-category-id?category_id=${categoryId}`
        )
        this.questions = response.data.data.map(item => ({
          id: item.question_id,
          question: item.title,
          categoryId: item.category_id
        }))
        /*if (response.data.success) {

        } else {
          this.error = 'Failed to load questions.'
        }*/
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
