import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api", // указание адреса сервера
  headers: {
    "Content-Type": "application/json", // обмен данными будем осуществлять в формате json
  }
});