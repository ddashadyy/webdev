import http from "../http-common";

function getUserBoard() {
    // Обращаемся к серверу для проверки, авторизован ли пользователь.
    // Не обрабатываем результат, так как ответ полностью возвращаем в метод, из которого вызывается getUserBoard().
    return http.get("/auth/verify");
}

export default {
    getUserBoard: getUserBoard
};
