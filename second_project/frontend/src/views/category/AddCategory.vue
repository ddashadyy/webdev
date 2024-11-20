<template>
    <div>
      <h4>Добавление категории</h4>
      <div v-if="!submitted">
        <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
        Обработчик addCategory определён в script-->
        <form @submit="addCategory">
          <!--v-model - директива для связывания данных с элементами.
          Связь происходит при помощи переменных, которые определены в setup()-->
          <input type="text" name="name" id="name" placeholder="Наименование категории" required v-model="category.name">
          <input type="submit" value="Добавить">
        </form>
      </div>
      <div v-else>
        <h4>Вы успешно добавили запись</h4>
        <div>
          <!--В v-on:click указывается обработчик, который выполнится после нажатия на кнопку "Добавить новую категорию"
          Обработчик newCategory определён в script-->
          <button v-on:click="newCategory">Добавить новую категорию</button>
        </div>
        <div>
          <router-link to="/listCategories">Вернуться к списку категорий</router-link>
        </div>
      </div>
    </div>
  </template>
  
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