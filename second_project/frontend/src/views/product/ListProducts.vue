<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <router-link to="/addProduct" class="btn btn-success mb-3">Добавить товар</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="card search-card">
          <div class="card-body">
            <h5 class="card-title">Параметры поиска</h5>
            <select class="form-control" v-model="filterCategoryId">
              <option value="">Выберите категорию</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <div class="input-group mt-3">
              <input type="number" placeholder="Минимальная цена" v-model.number="minPrice" class="form-control" />
              <span class="input-group-text">руб.</span>
            </div>
            <div class="input-group mt-3">
              <input type="number" placeholder="Максимальная цена" v-model.number="maxPrice" class="form-control" />
              <span class="input-group-text">руб.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div v-if="filteredProducts.length">
            <div class="col-md-4 mb-3" v-for="product in filteredProducts" :key="product.id">
              <div class="card product-card text-center" style="height: 280px">
                <div v-if="product.url_image">
                  <router-link :to="`/product/${product.id}`" class="product-image-container">
                    <img :src="product.url_image" alt="Product" class="card-img-top product-image" />
                  </router-link>
                </div>
                <div class="card-body">
                  <h5 class="card-title">
                    <router-link :to="`/product/${product.id}`" class="product-link">{{ product.name }}</router-link>
                  </h5>
                  <div class="card-text">Категория: {{ product.category ? product.category.name : "Не указана" }}</div>
                  <div class="card-text mt-1">Цена: {{ product.price }} руб.</div>
                  <div class="card-text mt-1">Количество: {{ product.count }}</div>
                  <div class="card-text mt-1">Описание: {{ product.description }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="col">
              <div class="alert alert-info">Товары не найдены</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-card {
  background-color: #f9f9f9; 
  border-radius: 8px; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
}

.product-card {
  background-color: #ffffff; 
  border-radius: 8px; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
  transition: transform 0.2s; 
}

.product-card:hover {
  transform: scale(1.02); 
}

.product-image-container {
  display: inline-block;
  height: 150px;
  overflow: hidden;
}

.product-image {
  width: auto;
  height: 100%;
  object-fit: cover; 
}

.product-link {
  text-decoration: none; 
  color: #333; 
}

.product-link:hover {
  color: #007bff; 
}

.btn-success {
  background-color: #28a745; 
  color: white; 
}

.btn-success:hover {
  background-color: #218838; 
}

.input-group .form-control {
  border-radius: 5px;
}

.input-group-text {
  border-radius: 0 5px 5px 0; 
}
</style>


<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import http from "../../http-common";

export default defineComponent({
  name: "ListProducts",
  setup() {
    const products = ref([]);
    const filteredProducts = ref([]);
    const filterCategoryId = ref("");
    const minPrice = ref("");
    const maxPrice = ref("");
    const categories = ref([]);

    const getProducts = async () => {
      try {
        const response = await http.get("/product/listProducts");
        console.log(response.data);
        products.value = response.data;
        filteredProducts.value = response.data;
      } catch (e) {
        console.log(e);
      }
    };

    const getCategories = async () => {
      try {
        const response = await http.get("/category/getAllCategories");
        categories.value = response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const applyFilters = () => {
      let results = products.value;

      if (filterCategoryId.value) {
        results = results.filter(
          (product) => product.category_id === parseInt(filterCategoryId.value)
        );
      }

      if (minPrice.value) {
        results = results.filter(
          (product) => product.price >= parseFloat(minPrice.value)
        );
      }

      if (maxPrice.value) {
        results = results.filter(
          (product) => product.price <= parseFloat(maxPrice.value)
        );
      }

      filteredProducts.value = results;
    };

    onMounted(() => {
      getProducts();
      getCategories();
    });

    watch([filterCategoryId, minPrice, maxPrice], applyFilters);

    return {
      products,
      filteredProducts,
      filterCategoryId,
      minPrice,
      maxPrice,
      categories,
    };
  },
});
</script>

<style scoped>
.container-md {
  max-width: 960px;
}

.card {
  margin-bottom: 20px;
}

.input-group {
  display: flex;
}

.input-group .form-control {
  flex-grow: 1;
}

.input-group .input-group-text {
  display: flex;
  align-items: center;
}
</style>
