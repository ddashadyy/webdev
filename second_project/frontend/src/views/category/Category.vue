<template>
    <div v-if="category">
      <h4>Категория</h4>
      <div v-if="!submitted">
        <form @submit="updateCategory">
            <input type="text" name="name" id="name" placeholder="Наименование категории" required v-model="category.name">
            <input type="submit" value="Обновить">
        </form>
        <button @click="deleteCategory">Удалить</button>
      </div>
      <div v-else>
        <h4>Вы успешно обновили запись</h4>
        <router-link to="/listCategories">Вернуться к списку категорий</router-link>
    </div>
    </div>
    <div v-else>
      <br>
      <p>Выберите категорию</p>
    </div>
  </template>
  
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