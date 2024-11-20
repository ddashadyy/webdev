<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <router-link to="/addProduct" class="btn btn-success mb-3"
          >Добавить товар</router-link
        >
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Параметры поиска</h5>
            <select class="form-control" v-model="filterCategoryId">
              <option value="">Выберите категорию</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
            <div class="input-group mt-3">
              <input
                type="number"
                placeholder="Минимальная цена"
                v-model.number="minPrice"
                class="form-control"
              />
              <span class="input-group-text">руб.</span>
            </div>
            <div class="input-group mt-3">
              <input
                type="number"
                placeholder="Максимальная цена"
                v-model.number="maxPrice"
                class="form-control"
              />
              <span class="input-group-text">руб.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div v-if="filteredProducts.length">
            <div
              class="col-md-4 mb-3"
              v-for="product in filteredProducts"
              :key="product.id"
            >
              <div class="card text-center" style="height: 280px">
                <div v-if="product.url_image">
                  <router-link
                    :to="`/product/${product.id}`"
                    style="
                      display: inline-block;
                      height: 250px;
                      overflow: hidden;
                    "
                  >
                    <img
                      :src="product.url_image"
                      alt="Product"
                      class="card-img-top"
                      style="width: auto; height: 100%"
                    />
                  </router-link>
                </div>
                <div class="card-body">
                  <h5 class="card-title">
                    <router-link
                      :to="`/product/${product.id}`"
                      style="text-decoration: none"
                      >{{ product.name }}</router-link
                    >
                  </h5>
                  <div class="card-text">
                    Категория:
                    {{
                      product.category ? product.category.name : "Не указана"
                    }}
                  </div>
                  <div class="card-text mt-1">Цена: {{ product.price }}</div>
                  <div class="card-text mt-1">
                    Количество: {{ product.count }}
                  </div>
                  <div class="card-text mt-1">
                    Описание: {{ product.description }}
                  </div>
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
