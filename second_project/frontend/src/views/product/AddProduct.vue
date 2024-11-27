<template>
  <div class="container-md mt-3">
    <div class="row">
      <div class="col-sm-4">
        <div v-if="!submitted">
          <form @submit.prevent="handleSubmit" class="form-container">
            <div class="form-group">
              <input
                type="text"
                v-model="formData.name"
                placeholder="Наименование товара"
                class="form-control"
                required
              />
            </div>
            <div class="form-group mt-2">
              <input
                type="number"
                step="0.01"
                v-model="formData.price"
                placeholder="Цена товара"
                class="form-control"
                required
              />
            </div>
            <div class="form-group mt-2">
              <input
                type="number"
                v-model="formData.count"
                placeholder="Количество товара"
                class="form-control"
                required
              />
            </div>
            <div class="form-group mt-2">
              <textarea
                v-model="formData.description"
                placeholder="Описание товара"
                class="form-control"
              />
            </div>
            <div class="form-group mt-2">
              <select
                class="form-control"
                v-model="formData.category_id"
                required
              >
                <option value="" disabled selected>Выберите категорию</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="form-group mt-2">
              <input
                type="file"
                @change="handleFileChange"
                class="form-control"
                required
              />
            </div>
            <button type="submit" class="btn btn-success mt-2">Добавить</button>
          </form>
        </div>
        <div v-else>
          <router-link to="/listProducts" class="success-message">
            Товар успешно добавлен! Перейти к списку товаров.
          </router-link>
        </div>
      </div>
      <div class="col-sm-4">
        <div>
          <img
            v-if="icon"
            :src="icon"
            alt="Brand Icon"
            class="product-icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  background-color: #ffffff; 
  padding: 20px; 
  border-radius: 8px; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
}

.form-control {
  border: 1px solid #ccc; 
  border-radius: 5px; 
  padding: 10px;
  transition: border-color 0.3s; 
}

.form-control:focus {
  border-color: #007bff; 
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); 
}

.btn-success {
  background-color: #28a745; 
  color: white; 
  border: none; 
  border-radius: 5px; 
  padding: 10px 15px; 
  cursor: pointer; 
}

.btn-success:hover {
  background-color: #218838; 
}

.success-message {
  display: block;
  margin-top: 20px;
  text-align: center; 
  color: #28a745; 
}

.product-icon {
  width: 150px;
  height: auto;
}
</style>


<script>
import { defineComponent, ref, onMounted } from "vue";
import http from "../../http-common";

export default defineComponent({
  name: "AddProduct",
  setup() {
    const formData = ref({
      name: "",
      price: "",
      count: "",
      description: "",
      category_id: "",
    });
    const selectedFile = ref(null);
    const categories = ref([]);
    const submitted = ref(false);
    const icon = ref("");

    const getCategories = async () => {
      try {
        const response = await http.get("/category/getAllCategories");
        categories.value = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      }
    };

    const handleFileChange = (event) => {
      selectedFile.value = event.target.files[0];

      const reader = new FileReader();
      reader.onload = function (event) {
        icon.value = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    };

    const handleSubmit = async () => {
      const formDataWithImage = new FormData();
      formDataWithImage.append("name", formData.value.name);
      formDataWithImage.append("price", formData.value.price);
      formDataWithImage.append("count", formData.value.count);
      formDataWithImage.append("description", formData.value.description);
      formDataWithImage.append("image", selectedFile.value);
      formDataWithImage.append("category_id", formData.value.category_id);

      try {
        await http.post("/product/addProduct", formDataWithImage, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        submitted.value = true;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getCategories();
    });

    return {
      formData,
      selectedFile,
      categories,
      submitted,
      icon,
      handleFileChange,
      handleSubmit,
    };
  },
});
</script>
