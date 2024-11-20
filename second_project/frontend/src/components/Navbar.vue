<template>
  <div id="app">
    <nav class="row">
      <router-link class="col" to="/listCategories">Категории</router-link>
      <router-link class="col" to="/listProducts">Товары</router-link>
      <router-link class="col" to="/selectProducts">Товары для продажи</router-link>
      <div v-if="currentUser" class="col">
        <router-link to="/profile">
          {{ currentUser.username }}
        </router-link>
        <a href @click.prevent="logOut"> Выйти </a>
      </div>
      <div v-else class="col">
        <router-link to="/login"> Войти </router-link>
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

<style>
</style>
