<template>
  <div class="category-container">
    <h4 class="header">Добавление категории</h4>
    <div v-if="!submitted">
      <form @submit="addCategory" class="category-form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Наименование категории"
          required
          v-model="category.name"
          class="form-input"
        />
        <input type="submit" value="Добавить" class="submit-button" />
      </form>
    </div>
    <div v-else>
      <h4 class="success-message">Вы успешно добавили запись</h4>
      <div>
        <button v-on:click="newCategory" class="new-category-button">Добавить новую категорию</button>
      </div>
      <div>
        <router-link to="/listCategories" class="link">Вернуться к списку категорий</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-container {
  max-width: 500px; 
  margin: 0 auto; 
  padding: 20px; 
  background-color: #ffffff; 
  border-radius: 8px; 
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); 
}

.header {
  text-align: center; 
  color: #333; 
}

.category-form {
  display: flex;
  flex-direction: column; 
}

.form-input {
  padding: 10px; 
  margin-bottom: 15px; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
  font-size: 16px;
}

.form-input:focus {
  border-color: #007bff; 
  outline: none; 
}

.submit-button {
  padding: 10px; 
  background-color: #28a745; 
  border: none;
  border-radius: 5px;
  color: white; 
  font-size: 16px; 
  cursor: pointer; 
}

.submit-button:hover {
  background-color: #218838; 
}

.success-message {
  text-align: center; 
  color: #28a745; 
}

.new-category-button {
  padding: 10px; 
  background-color: #007bff; 
  border: none; 
  border-radius: 5px; 
  color: white; 
  font-size: 16px; 
  cursor: pointer; 
}

.new-category-button:hover {
  background-color: #0056b3; 
}

.link {
  display: block;
  text-align: center; 
  margin-top: 15px; 
  color: #007bff; 
}

.link:hover {
  text-decoration: underline; 
}
</style>

  
  <script>
  import { defineComponent, ref } from 'vue';
  import http from "../../http-common";
  
  export default defineComponent({
    name: "AddCategory",
    setup() {
      const category = ref({
        name: ""
      });
      const submitted = ref(false);
  
      const addCategory = (e) => {
        e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
        const data = {
          name: category.value
        };
        console.log(data);
        // Либо const data = category.value;
        http
          .post("/category/addCategory", data)
          .then(response => { // запрос выполнился успешно
            category.value.id = response.data.id;
          })
          .catch(e => { // при выполнении запроса возникли ошибки
            console.log(e);
          });
  
        submitted.value = true;
      };
  
      const newCategory = () => {
        submitted.value = false;
        category.value = {
          name: ""
        };
      };
  
      return {
        category,
        submitted,
        addCategory,
        newCategory
      };
    }
  });
  </script>