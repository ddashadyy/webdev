const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h" });
};

class AuthController {
    async userRegistration(req, res) {
        try {
            const {
                username,
                password,
                role,
                firstname,
                lastname,
                middlename,
            } = req.body;
            const isUserExists = await prisma.user.findUnique({
                where: { username: username },
            });

            if (isUserExists) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = bcrypt.hashSync(password, 7);
            

            const newUser = await prisma.user.create({
                data: {
                    username: username,
                    password: hashedPassword,
                    role: role,
                    firstname: firstname,
                    lastname: lastname,
                    middlename: middlename,
                },
            });

            console.log(newUser);
            return res.status(200).json(newUser);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await prisma.user.findUnique({
                where: {
                    username: username,
                },
            });

            if (user) {
                const comparedPassword = bcrypt.compareSync(
                    password,
                    user.password
                );
                if (comparedPassword) {
                    const token = generateAccessToken(user.id);

                    console.log(token);

                    const responseUser = {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        middlename: user.middlename,
                        accessToken: token
                    }

                    res.json(responseUser);
                } else {
                    res.json({ message: "Неверный логин или пароль" });
                }
            } else {
                res.json({ message: "Неверный логин или пароль" });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async verify(req, res) {
        try {
            const token = req.headers["x-access-token"];
        if (!token) {
            res.status(403).json({
                message: "Токен не предоставлен",
            });
            return;
        }

        const isVerified = jwt.verify(token, process.env.SECRET_KEY);
        if (!isVerified) {
            res.status(401).json({ message: "Неавторизован" });
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                id: isVerified.id,
            },
        });

        console.log({ user, token });
        res.status(200).json({ user, token });
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async refreshToken(req, res) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: req.body.username
                },
            });

            if (!user) {
                res.json({message: "Неверно введен логин или пароль"});
                return;
            }

            const token = generateAccessToken(user.id);
            
            console.log("Новый токен");
            console.log(token);
            res.json(token);
        } catch(e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async getUserById(req, res) {
        try {
            const existedUser = await prisma.user.findUnique({
                where: {
                    id: req.params.id
                }
            });
        } catch(e) {
            console.log(e);
            res.status(500).json(e);
        }
    }
}

module.exports = new AuthController();