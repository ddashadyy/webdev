<script setup>
import Navbar from './components/Navbar.vue'

</script>

<template>
  <div id="app">
    <navbar/>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    // Здесь можно добавить реактивные данные или методы, если они понадобятся
    return {};
  }
});
</script>

<style scoped>
#app {
  font-family: 'Arial', sans-serif; /* Шрифт для всего приложения */
  background-color: #f4f4f4; /* Светлый фон для всего приложения */
  display: flex;
  flex-direction: column; /* Вертикальное расположение элементов */
}

navbar {
  background-color: #007bff; /* Цвет фона навигационной панели */
  color: white; /* Цвет текста в навигационной панели */
  padding: 10px 20px; /* Внутренние отступы для навигационной панели */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Легкая тень под панелью */
}

router-view {
  flex: 1; /* Занимает оставшееся пространство */
  padding: 20px; /* Внутренние отступы для содержимого страниц */
}
</style>