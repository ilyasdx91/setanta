<template>
  <category-header></category-header>
  <div class="category">
    <img src="@/assets/img/image-category.png" alt="" />
    <div class="inner">
      <h1>Sport trophies</h1>
      <p>
        Describe sport trophies. Just make sure your friends guess what trophy
        you are showing
      </p>
      <router-link :to="{ name: 'Game' }" class="btn btn-yellow">
        {{ $t('start') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import CategoryHeader from '@/components/CategoryHeader.vue'
</script>
