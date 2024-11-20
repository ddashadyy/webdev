<template>
  <div class="col-md-9 mt-2">
    <div class="row">
      <div v-if="products.length === 0" class="col">
        <div class="alert alert-info">Товары не найдены</div>
      </div>
      <div v-for="product in products" :key="product.id" class="col-md-4 mb-3">
        <div class="card text-center" style="height: 280px">
          <router-link
            :to="'/product/' + product.id"
            style="display: inline-block; height: 250px; overflow: hidden"
          >
            <img
              :src="product.url_image"
              alt="product"
              class="card-img-top"
              style="width: auto; height: 100%"
            />
          </router-link>
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <div class="card-text">
              Категория:
              {{ product.category ? product.category.name : "Не указана" }}
            </div>
            <div class="card-text mt-1">Цена: {{ product.price }}</div>
            <div class="card-text mt-1">
              Описание: {{ product.description }}
            </div>
            <button
              class="btn btn-sm btn-success mt-1"
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
