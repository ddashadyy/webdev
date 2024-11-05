const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserController {
  async createUser(req, res, next) {
    const username = req.body.username;
    const isUserExists = await prisma.user.findUnique({
      where: { username: username },
    });

    if (isUserExists) {
      console.log("Пользователь с данным логином уже существует");
      res
        .status(400)
        .json({ message: "Пользователь с данным логином уже существует" });
    } else {
      const hashedPasswd = bcrypt.hashSync(req.body.password, 7);
      const newUser = await prisma.user.create({
        data: {
          username: req.body.username,
          password: hashedPasswd,
          role: req.body.role,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          middlename: req.body.middlename,
        },
      });
      console.log(newUser);
      res.status(200).json({ newUser });
    }
  }

  async verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      res.status(403).json({ message: "Токен не предоставлен" });
    }

    jwt.verify(token, process.env.SECRET_KEY);
  }





}
