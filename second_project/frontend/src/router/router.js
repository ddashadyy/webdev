import { createWebHistory, createRouter } from "vue-router";
import store from "../store/index";
// определяем маршруты
const routes = [
  {
    path: "/listCategories", // указание маршрута, по которому будем переходить к списку категорий
    name: "categories", // имя маршрута
    alias: "/categories", // указание дополнительного маршрута
    component: () => import("../views/category/ListCategories.vue"), // компонент, на основании которого будет отрисовываться страница
    meta: {
      title: "Список категорий",
    },
  },
  {
    path: "/category/:id",
    name: "category-details",
    component: () => import("../views/category/Category.vue"),
    props: true, // указываем, что компонент Category.vue может принимать параметры в адресной строке, например, в path указан id
    meta: {
      title: "Данные категорий",
    },
  },
  {
    path: "/addCategory",
    name: "add-user",
    component: () => import("../views/category/AddCategory.vue"),
    meta: {
      title: "Добавление категории",
    },
  },
  {
    path: "/searchCategories",
    name: "search-categories",
    component: () => import("../views/category/SearchCategories.vue"),
    meta: {
      title: "Поиск категорий",
    },
  },
  {
    path: "/login",
    name: "login-user",
    component: import("../views/authorization/Login.vue"),
    meta: {
      title: "Вход в систему",
    },
  },
  {
    path: "/register",
    name: "register-user",
    component: import("../views/authorization/Register.vue"),
    meta: {
      title: "Регистрация",
    },
  },
  {
    path: "/profile",
    name: "profile-user",
    component: import("../views/authorization/Profile.vue"),
    meta: {
      title: "Профиль пользователя",
      // маршрут защищаем (делаем доступным только авторизованным пользователям)
      requiredAuth: true,
    },
  },
  {
    path: "/listProducts",
    name: "products",
    alias: "/products",
    component: () => import("../views/product/ListProducts.vue"),
    meta: {
      title: "Список товаров",
    },
  },
  {
    path: "/addProduct",
    name: "add-product",
    component: () => import("../views/product/AddProduct.vue"),
    meta: {
      title: "Добавление товара",
    },
  },
  {
    path: "/product/:id",
    name: "product-details",
    component: () => import("../views/product/Product.vue"),
    props: true,
    meta: {
      title: "Данные товара",
    },
  },

  {
    path: "/selectProducts",
    name: "select-products",
    component: () => import("../views/cart/SelectProducts.vue"),
    meta: {
      title: "Товары для продажи",
    },
  },
];

const router = createRouter({
  history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
  routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach(async (to, from, next) => {
  // устанавливаем заголовок страницы в зависимости от метаданных маршрута
  document.title = to.meta.title || "Главная страница";

  // проверяем наличие токена и срок его действия
  const isTokenActive = await store.getters["auth/isTokenActive"];

  // если токен действителен, продолжаем навигацию
  if (isTokenActive) {
    return next();
  }

  // получаем пользователя из локального хранилища
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  if (user) {
    try {
      // пытаемся обновить токен
      await store.dispatch("auth/refreshToken", user);
      return next(); // Если обновление прошло успешно, продолжаем навигацию
    } catch (err) {
      console.error("Ошибка обновления токена:", err); // логируем ошибку
      localStorage.removeItem("user"); // удаляем пользователя из локального хранилища
      return next({ path: "/login" }); // переходим на страницу входа
    }
  } else {
    // если токена нет или он истек, проверяем, требуется ли авторизация для доступа к маршруту
    localStorage.removeItem("user"); // удаляем пользователя из локального хранилища

    if (to.meta.requiredAuth) {
      return next({ path: "/login" }); // если доступа нет, перенаправляем на страницу входа
    }
  }

  // если маршрут не требует авторизации, продолжаем навигацию
  return next();
});

export default router;
