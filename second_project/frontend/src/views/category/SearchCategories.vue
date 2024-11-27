<template>
  <div class="search-container">
    <h4 class="search-title">Поиск категорий по названию</h4>
    <form @submit="searchCategoriesByName" class="search-form">
      <input type="text" name="name" id="name" placeholder="Наименование категории" required v-model="name" class="search-input">
      <input type="submit" value="Поиск" class="search-button">
    </form>

    <ul class="search-result">
      <li v-for="(category, index) in categories" :key="index" class="result-item">
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-container {
  max-width: 600px; 
  margin: 0 auto; 
  padding: 20px;
  background-color: #f9f9f9; 
  border-radius: 8px; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
}

.search-title {
  text-align: center;
  color: #333; 
  margin-bottom: 20px;
}

.search-form {
  display: flex; 
  justify-content: center; 
  margin-bottom: 20px;
}

.search-input {
  flex-grow: 1; 
  padding: 10px;
  border: 1px solid #ccc; 
  border-radius: 5px; 
  margin-right: 10px; 
}

.search-button {
  padding: 10px 15px; 
  background-color: #007bff; 
  color: white; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  transition: background-color 0.3s; 
}

.search-button:hover {
  background-color: #0056b3; 
}

.search-result {
  list-style-type: none; 
  padding: 0; 
}

.result-item {
  padding: 10px;
  background-color: #e7f3fe; 
  color: #31708f; 
  border-radius: 5px; 
  margin-bottom: 10px; 
}

.result-item:hover {
  background-color: #c6e2ff; 
}
</style>

  
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