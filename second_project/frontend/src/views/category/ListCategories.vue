<template>
  <div class="category-list">
    <h4 class="title">Список категорий</h4>
    <div v-if="displayContent">
      <router-link class="item add-category" to="/addCategory">Добавить категорию</router-link>
    </div>
    <div v-else class="alert">Добавление доступно только авторизованным пользователям</div>
    <router-link class="item search-category" to="/searchCategories">Поиск категории</router-link>
    <ul class="category-items">
      <li v-for="(category, index) in categories" :key="index" class="category-item">
        <router-link
          :to="{ name: 'category-details', params: { id: category.id } }"
          class="category-link"
        >
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.category-list {
  max-width: 600px; 
  margin: 0 auto; 
  padding: 20px;
  background-color: #f9f9f9; 
  border-radius: 8px; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
}

.title {
  text-align: center;
  color: #333; 
  margin-bottom: 20px;
}

.item {
  display: block;
  text-align: center;
  margin: 10px 0;
  padding: 10px;
  text-decoration: none;
  color: #007bff; 
  border: 1px solid #007bff; 
  border-radius: 5px; 
  transition: background-color 0.3s, color 0.3s; 
}

.item:hover {
  background-color: #007bff; 
  color: white; 
}

.alert {
  color: #d9534f; 
  text-align: center;
  margin: 10px 0;
}

.category-items {
  list-style-type: none; 
  padding: 0; 
}

.category-item {
  margin: 10px 0; 
}

.category-link {
  display: block;
  padding: 10px;
  background-color: #e7f3fe; 
  color: #31708f; 
  border-radius: 5px; 
  text-decoration: none; 
}

.category-link:hover {
  background-color: #c6e2ff; 
}
</style>

<script>
import { defineComponent, ref, onMounted } from "vue";
import http from "../../http-common";
import UserService from "../../services/user.service"; // подключение объекта, который позволяет отправлять запросы серверу

export default defineComponent({
  name: "ListCategories", // имя шаблона
  setup() {
    const categories = ref([]);
    const displayContent = ref(false);

    const getCategories = () => {
      http
        .get("/category/getAllCategories") // обращаемся к серверу для получения списка категорий
        .then((response) => {
          // запрос выполнен успешно
          console.log(response.data);
          categories.value = response.data;
        })
        .catch((e) => {
          // запрос выполнен с ошибкой
          console.log(e);
        });
    };

    onMounted(() => {
      // вызывается после монтирования компонента
      UserService.getUserBoard()
        .then(() => {
          displayContent.value = true; // если пользователь авторизован, показываем контент
        })
        .catch((e) => {
          console.error(
            (e.response && e.response.data) || e.message || e.toString()
          );
        });

      getCategories();
    });

    return {
      categories,
      getCategories,
      displayContent,
    };
  },
});
</script>

<style>
.item {
  margin-left: 5px;
}
</style>
