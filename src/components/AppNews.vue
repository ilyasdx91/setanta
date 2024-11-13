<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <button class="btn" @click="isOpen = !isOpen">Open</button>
    <p v-if="isOpen">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
      recusandae placeat doloribus accusamus fuga quibusdam perferendis aut id
      aliquid fugiat.
    </p>
  </div>
</template>
<script>
// import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      title: 'title',
      isOpen: false,
    }
  },
}
</script>
