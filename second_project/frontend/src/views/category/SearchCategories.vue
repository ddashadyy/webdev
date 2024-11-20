<template>
    <div>
      <h4>Поиск категорий по названию</h4>
      <form @submit="searchCategoriesByName">
        <input type="text" name="name" id="name" placeholder="Наименование категории" required v-model="name">
        <input type="submit" value="Поиск">
      </form>
  
      <ul class="search-result">
        <li v-for="(category, index) in categories" :key="index">
          {{ category.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import http from "../../http-common";
  
  export default defineComponent({
    name: "SearchCategories",
    setup() {
      const name = ref("");
      const categories = ref([]);
  
      const searchCategoriesByName = (e) => {
        e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
        http
          .get("/category/getCategoryByName/" + name.value)
          .then(response => {
            categories.value = response.data;
          })
          .catch(e => {
            console.log(e);
          });
      };
  
      return {
        name,
        categories,
        searchCategoriesByName
      };
    }
  });
  </script>
  
  <style>
    .search-result {
      list-style-type: none;
      padding: 0;
    }
    .search-result li {
      margin-bottom: 5px;
    }
  </style>