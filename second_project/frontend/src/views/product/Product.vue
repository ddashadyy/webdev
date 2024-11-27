<template>
  <div class="container-md mt-3">
    <div class="row">
      <div class="col-sm-8">
        <div v-if="!submitted" class="form-card">
          <h2 class="form-title">Обновление товара</h2>
          <form @submit.prevent="handleSubmit">
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
                <option value="" disabled>Выберите категорию</option>
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
              />
            </div>
            <button type="submit" class="btn btn-success mt-2">Обновить</button>
          </form>
          <button @click="deleteProduct" class="btn btn-danger mt-2">Удалить</button>
        </div>
        <div v-else>
          <router-link to="/listProducts" class="success-link">
            Товар успешно обновлен. Перейти к списку товаров.
          </router-link>
        </div>
      </div>
      <div class="col-sm-4">
        <div>
          <img
            v-if="icon"
            :src="icon"
            alt="Товар"
            class="product-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-card {
  background-color: #f9f9f9; 
  border-radius: 8px; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
  padding: 20px; 
}

.form-title {
  margin-bottom: 20px; 
  color: #333; 
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  border-radius: 5px; 
  border: 1px solid #ccc; 
}

.form-control:focus {
  border-color: #007bff; 
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); 
}

.btn-success {
  background-color: #28a745; 
  color: white; 
}

.btn-success:hover {
  background-color: #218838; 
}

.btn-danger {
  background-color: #dc3545; 
  color: white;
}

.btn-danger:hover {
  background-color: #c82333; 
}

.success-link {
  display: inline-block;
  margin-top: 20px; 
  color: #007bff; 
}

.success-link:hover {
  text-decoration: underline; 
}

.product-image {
  width: 150px; 
  height: auto; 
}
</style>


<script>
import { defineComponent, ref, onMounted } from "vue";
import http from "../../http-common";
import { useRoute } from "vue-router";
import product from "./Product.vue";

export default defineComponent({
  name: "Product",
  setup() {
    const formData = ref({
      name: "",
      price: 0,
      count: 0,
      description: "",
      category_id: "",
    });
    const selectedFile = ref(null);
    const categories = ref([]);
    const submitted = ref(false);
    const icon = ref("");
    const route = useRoute();
    
    

    // Загрузка данных товара
    const getGood = async () => {
      const id = route.params.id;
      try {
        const response = await http.get(`/product/getProductById/${id}`);
        const { name, price, count, description, category_id, url_image } =
          response.data;
        formData.value = { name, price, count, description, category_id };
        if (url_image) {
          icon.value = url_image;
        }
      } catch (error) {
        console.error("Ошибка при загрузке товара:", error);
      }
    };

    const deleteProduct = async () => {
      console.log("ya tut");
        try {
          const response = await http.post(`/product/deleteProduct/${route.params.id}`);
          console.log(response);
          
          window.location.href = "/listProducts";
        } catch (e) {
            console.log(e)
        }


      // http
      //     .post("/product/deleteProduct/" + route.params.id)
      //     .then(() => {
      //       router.push('/listProducts'); // переходим к списку категорий
      //     })
      //     .catch(e => {
      //       console.log(e);
      //     });

    };

    const getCategories = async () => {
      try {
        const response = await http.get("/category/getAllCategories");
        categories.value = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      }
    };

    // Обработка изменения файла
    const handleFileChange = (event) => {
      selectedFile.value = event.target.files[0];

      const reader = new FileReader();
      reader.onload = function (event) {
        icon.value = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    };

    // Обработка отправки формы
    const handleSubmit = async () => {
      const formDataWithImage = new FormData();
      formDataWithImage.append("name", formData.value.name);
      formDataWithImage.append("price", formData.value.price);
      formDataWithImage.append("count", formData.value.count);
      formDataWithImage.append("description", formData.value.description);
      formDataWithImage.append("category_id", formData.value.category_id);

      if (selectedFile.value) {
        formDataWithImage.append("image", selectedFile.value); // Добавляем изображение только если оно выбрано
      }

      try {
        const id = route.params.id; // получаем ID товара из параметров маршрута
        await http.post(`/product/updateProduct/${id}`, formDataWithImage, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        submitted.value = true;
      } catch (error) {
        console.error("Ошибка при обновлении товара:", error);
      }
    };

    onMounted(() => {
      getGood();
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
      deleteProduct
    };
  },
});
</script>
