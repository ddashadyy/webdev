const { PrismaClient } = require("@prisma/client");
const path = require("path");
const bcrypt = require("bcrypt");
const { json } = require("express");
const prisma = new PrismaClient();

class UserController
{
    // Регистрация
    async registrateUser(req, res)
    {
        const { username, password, role, firstname, lastname, middlename } = req.body;
        const isUserExists = await prisma.user.findUnique
        (
            { where: { username: username } }
        );

        if (isUserExists) return res.json({ message: "Пользователь с таким email уже существует" });
        else
        {
            const hashedPassword = bcrypt.hash(password, 5);
            const newUser = await prisma.user.create
            (
                {
                    data:
                    {
                        username: username,
                        password: hashedPassword,
                        role: role,
                        firstname: firstname,
                        lastname: lastname,
                        middlename: middlename
                    }
                }
            );

            return res.json(newUser);
        }
    }

    // Вход
    async logInUser(req, res)
    {
        const { username, password } = req.body;
        const isUserExists = await prisma.user.findUnique
        (
            { where: { username: username } }
        );

        if (isUserExists)
        {
            const comparedPassword = bcrypt.compareSync(password, user.password);

            if (comparedPassword) return res.json({ message: "access granted" });
            else return res.json({ message: "access denied" });
        }
        else return res.json({ message: "Пользователь с таким email уже существует" });
    }

    async logOutUser(req, res)
    {
        return res.json({ message: "logout" });
    }

    async getUser(req, res) 
    {
        const { id } = req.param;
    
        const user = await prisma.user.findUnique
        (
            { where: { id: id } }
        );

        res.json(user);
      }

    async getAllUsers(req, res)
    {
        const users = await prisma.user.findMany();
        return res.json(users);
    }

    async updateUsersInformation(req, res)
    {
        const { id } = req.params;
        const { firstname, lastname, middlename } = req.body;

        const isUserExists = await prisma.category.findUnique
        (
            { where: { id: parseInt(id) } }
        );

        if (!isUserExists) return res.status(404).json({ message: "Пользователь не найден" });
        else
        {
            const updatedUser = await prisma.category.update
            (
                {
                    where: { id: parseInt(id) },
                    data: 
                    { 
                        firstname: firstname,
                        lastname: lastname,
                        middlename: middlename
                    }
                }
            );
            
            return res.json(updatedUser);
        }
    }

    async deleteUser(req, res)
    {
        const { id } = req.params;
        const { firstname, lastname, middlename } = req.body;

        const isUserExists = await prisma.category.findUnique
        (
            { where: { id: parseInt(id) } }
        );

        if (!isUserExists) return res.status(404).json({ message: "Пользователь не найден" });
        else
        {
            const deletedUser = await prisma.category.delete
            (
                { where: { id: parseInt(id) } }
            );
            
            return res.json(deletedUser);
        }
    }
}

module.exports = new UserController();