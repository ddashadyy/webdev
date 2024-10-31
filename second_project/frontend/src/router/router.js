import { createWebHistory, createRouter } from "vue-router";

// определяем маршруты
const routes = [
    {
        path: "/listCategories", // указание маршрута, по которому будем переходить к списку категорий
        name: "categories", // имя маршрута
        alias: "/categories", // указание дополнительного маршрута
        component: () => import('../views/category/ListCategories.vue'), // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список категорий"
        }
    },
    {
        path: "/category/:id",
        name: "category-details",
        component: () => import('../views/category/Category.vue'),
        props: true, // указываем, что компонент Category.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные категорий"
        }
    },
    {
        path: "/addCategory",
        name: "add-user",
        component: () => import('../views/category/AddCategory.vue'),
        meta: {
            title: "Добавление категории"
        }
    },
    {
        path: "/searchCategories",
        name: "search-categories",
        component: () => import('../views/category/SearchCategories.vue'),
        meta: {
            title: "Поиск категорий"
        }
    },
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';
    next();
});

export default router;