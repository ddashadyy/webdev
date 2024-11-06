const express = require("express");
const cors = require("cors");
const router = require("./app/route/index");
const path = require("path");
dotenv.config();
const PORT = process.env.PORT;
const app = express();


const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // указываем, откуда будут приходить запросы
  credentials: true, // разрешаем обрабатывать запросы
  optionSuccessStatus: 200, // при успешной обработке запроса будет возвращён статус 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);
app.use(notFound);
app.use(errorHandler);


const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
