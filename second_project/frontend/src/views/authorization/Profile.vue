<template>
  <div class="container profile-container">
    <header>
      <h3 class="profile-header">
        Профиль <strong>{{ currentUser.username }}</strong>
      </h3>
    </header>
    <p class="profile-item">
      <strong>Токен JWT:</strong>
      <!-- Токен не рекомендуется выводить на веб-странице, но для ознакомления он будет отображён на странице профиля пользователя -->
      <span class="token">{{ currentUser.accessToken }}</span>
    </p>
    <p class="profile-item">
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>
    <p class="profile-item">
      <strong>Логин:</strong>
      {{ currentUser.username }}
    </p>
  </div>
</template>

<style scoped>
.profile-container {
  background-color: #f9f9f9; 
  border-radius: 10px; 
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
  max-width: 600px; 
  margin: auto; 
}

.profile-header {
  text-align: center; 
  color: #333; 
  margin-bottom: 20px; 
}

.profile-item {
  font-size: 16px; 
  color: #555; 
  margin-bottom: 15px; 
}

.token {
  display: block; 
  margin-top: 5px; 
  padding: 10px; 
  background-color: #e9ecef; 
  border-radius: 5px; 
  overflow-wrap: break-word; 
}

</style>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "ProfileUser",
  setup() {
    const store = useStore();
    const router = useRouter();

    const currentUser = computed(() => store.state.auth.user);

    onMounted(() => {
      if (!currentUser.value) {
        router.push("/login");
      }
    });

    return {
      currentUser,
    };
  },
};
</script>
