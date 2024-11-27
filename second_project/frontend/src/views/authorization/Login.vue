<template>
  <div class="col-md-5 mx-auto mt-4 login-container">
    <h4 class="text-center">Вход в систему</h4>
    <form @submit.prevent="handleLogin">
      <div class="form-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Логин"
          v-model="user.username"
          required
        />
      </div>
      <div class="form-group mb-3">
        <input
          type="password"
          class="form-control"
          placeholder="Пароль"
          v-model="user.password"
          required
        />
      </div>
      <div class="form-group text-center">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm"></span>
          <span>Войти</span>
        </button>
      </div>
      <router-link to="/register" class="register-link">Зарегистрироваться</router-link>
      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  background-color: #f9f9f9;
  border-radius: 10px; 
  padding: 20px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}

.form-control {
  border: 1px solid #ced4da; 
  border-radius: 5px; 
  transition: border-color 0.3s ease; 
}

.form-control:focus {
  border-color: #007bff; 
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); 
}

.btn-primary {
  background-color: #007bff; 
  border-color: #007bff;
  transition: background-color 0.3s ease, transform 0.2s ease; 
}

.btn-primary:hover {
  background-color: #0056b3; 
  transform: scale(1.05);
}

.register-link {
  display: block;
  margin-top: 15px; 
  text-align: center; 
  color: #007bff; 
}

.register-link:hover {
  text-decoration: underline; 
}

.alert {
  margin-top: 15px; 
}
</style>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "LoginUser",
  setup() {
    const store = useStore();
    const user = ref({ username: "", password: "" });
    const loading = ref(false);
    const message = ref("");

    const handleLogin = async () => {
      loading.value = true;
      message.value = "";

      try {
        await store.dispatch("auth/login", user.value); // вызываем метод login(...) из auth.service.js
        window.location.href = "/"; // перенаправляем на главную страницу после успешного входа
      } catch (error) {
        console.log(error);
        loading.value = false; // устанавливаем состояние загрузки в false при ошибке
        message.value = error.response.data.message; // устанавливаем сообщение об ошибке из ответа сервера
      }
    };

    return {
      user,
      loading,
      message,
      handleLogin,
    };
  },
};
</script>
