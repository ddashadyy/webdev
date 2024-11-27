<template>
  <div class="col-md-9 mt-2">
    <div class="row">
      <div v-if="products.length === 0" class="col">
        <div class="alert alert-info">Товары не найдены</div>
      </div>
      <div v-for="product in products" :key="product.id" class="col-md-4 mb-3">
        <div class="card product-card text-center">
          <router-link
            :to="'/product/' + product.id"
            class="product-link"
          >
            <img
              :src="product.url_image"
              alt="product"
              class="card-img-top product-image"
            />
          </router-link>
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <div class="card-text">
              Категория:
              {{ product.category ? product.category.name : "Не указана" }}
            </div>
            <div class="card-text mt-1">Цена: {{ product.price }} руб.</div>
            <div class="card-text mt-1">
              Описание: {{ product.description }}
            </div>
            <button
              class="btn btn-sm btn-success mt-1 add-to-cart-button"
              @click="handleAddToCart(product)"
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background-color: #ffffff; 
  border-radius: 10px; 
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); 
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
}

.product-card:hover {
  transform: translateY(-5px); 
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2); 
}

.product-link {
  display: inline-block;
  height: 250px;
  overflow: hidden;
}

.product-image {
  width: auto;
  height: 100%;
  object-fit: cover; 
}

.card-title {
  font-size: 1.25rem; 
  color: #333; 
}

.card-text {
  color: #555; 
}

.add-to-cart-button {
  background-color: #28a745; 
  border-color: #28a745; 
}

.add-to-cart-button:hover {
  background-color: #218838; 
  border-color: #1e7e34; 
}
</style>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import http from "../../http-common";

const products = ref([]);
const store = useStore();
const userId = computed(() => store.state.auth.user.id);

const getProducts = async () => {
  try {
    const response = await http.get("/product/listProducts");
    products.value = response.data;
  } catch (e) {
    console.log(e);
  }
};

const handleAddToCart = (product) => {
  store.dispatch("addToCart", { productId: product.id, userId: userId.value });
};

onMounted(() => {
  getProducts();
});
</script>
