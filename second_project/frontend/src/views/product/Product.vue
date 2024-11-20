<template>
  <div class="container-md mt-3">
    <div class="row">
      <div class="col-sm-8">
        <div v-if="!submitted">
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
          <button v-on:click="deleteProduct" class="btn btn-success mt-2">Удалить</button>
        </div>
        <div v-else>
          <router-link to="/listProducts"
          >Товар успешно обновлен. Перейти к списку товаров.</router-link
          >
        </div>
      </div>
      <div class="col-sm-4">
        <div>
          <img
            v-if="icon"
            :src="icon"
            alt="Товар"
            style="width: 150px; height: auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import http from "../../http-common";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Product",
  // data() {
  //     return {
  //       product_id : route.params.id
  //     }
  // },
  // methods: {
  //       async deleteProduct() {
  //           console.log("stariy_bog zdes'");
  //           try {
  //               const response = await http.post(`/product/deleteProduct/${this.product.id}`);
  //               window.location.href = "/listProducts";
  //           } catch (e) {
  //               console.log(e);
  //           }
  //       },
  
  //   },
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
      
      console.log("stariy_bog zdes'");
    // async function deleteProduct() {
        try {
            const response = await http.post(`/product/deleteProduct/${this.product.id}`)

            getProducts()

            window.location.href = "/listProducts";

        } catch (e){
            console.log(e)
        }
    }

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
    };
  },
});
</script>
