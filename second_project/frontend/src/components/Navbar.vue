<template>
  <div id="app">
    <nav class="row">
      <router-link class="col nav-item" to="/listCategories">Категории</router-link>
      <router-link class="col nav-item" to="/listProducts">Товары</router-link>
      <router-link class="col nav-item" to="/selectProducts">Товары для продажи</router-link>
      <div v-if="currentUser" class="col user-info">
        <router-link class="nav-item" to="/profile">
          {{ currentUser.username }}
        </router-link>
        <a href @click.prevent="logOut" class="nav-item logout">Выйти</a>
      </div>
      <div v-else class="col user-info">
        <router-link class="nav-item" to="/login">Войти</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "NavBar",
  setup() {
    const store = useStore();

    const currentUser = computed(() => store.state.auth.user);

    const logOut = () => {
      store
        .dispatch("auth/logout")
        .then(() => {
          window.location.href = "/login";
        })
        .catch((err) => {
          console.error("Ошибка выхода:", err);
        });
    };

    return {
      currentUser,
      logOut,
    };
  },
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
}

.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #4CAF50; 
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.col {
  margin: 0 10px; 
}

.nav-item {
  color: blue;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.user-info {
  display: flex;
  align-items: center;
}

.logout {
  margin-left: 20px; 
}
</style>
