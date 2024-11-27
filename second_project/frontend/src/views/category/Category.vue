<template>
  <div class="category-update-container" v-if="category">
    <h4 class="header">Категория</h4>
    <div v-if="!submitted">
      <form @submit="updateCategory" class="category-form">
        <input type="text" name="name" id="name" placeholder="Наименование категории" required v-model="category.name" class="form-input">
        <input type="submit" value="Обновить" class="submit-button">
      </form>
      <button @click="deleteCategory" class="delete-button">Удалить</button>
    </div>
    <div v-else>
      <h4 class="success-message">Вы успешно обновили запись</h4>
      <router-link to="/listCategories" class="link">Вернуться к списку категорий</router-link>
    </div>
  </div>
  <div v-else>
    <br>
    <p class="select-category-message">Выберите категорию</p>
  </div>
</template>

<style scoped>
.category-update-container {
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

.delete-button {
  padding: 10px; 
  background-color: #dc3545; 
  border: none; 
  border-radius: 5px; 
  color: white; 
  font-size: 16px; 
  cursor: pointer; 
  margin-top: 10px; 
}

.delete-button:hover {
  background-color: #c82333; 
}

.success-message {
  text-align: center; 
  color: #28a745; 
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

.select-category-message {
  text-align: center; 
  color: #666; 
}
</style>

  
  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import http from "../../http-common";
  
  export default defineComponent({
    name: "CategoryDetails",
    props: ['id'],
    setup(props) {
      const category = ref(null);
      const submitted = ref(false);
      const router = useRouter();
  
      const getCategory = () => {
        http
          .get("/category/getCategoryById/" + props.id) // обращаемся к серверу для получения категории, id взят из входных параметров (props)
          .then(response => { // запрос выполнен успешно
            category.value = response.data;
          })
          .catch(e => { // запрос выполнен с ошибкой
            console.log(e);
          });
      };
  
      const updateCategory = (e) => {
        e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
        const data = {
          name: category.value.name
        };
  
        http
          .post("/category/updateCategory/" + category.value.id, data)
          .then(() => {
            router.push("/category/getAllCategories"); // переходим к списку категорий
          })
          .catch(e => {
            console.log(e);
          });
  
        submitted.value = true;
      };
  
      const deleteCategory = () => {
        http
          .post("/category/deleteCategoryById/" + category.value.id)
          .then(() => {
            router.push("/category/getAllCategories"); // переходим к списку категорий
          })
          .catch(e => {
            console.log(e);
          });
      };
  
      onMounted(() => {
        getCategory();
      });
  
      return {
        category,
        submitted,
        updateCategory,
        deleteCategory
      };
    }
  });
  </script>