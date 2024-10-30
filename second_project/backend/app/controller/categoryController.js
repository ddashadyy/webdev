const { PrismaClient } = require("@prisma/client");
const path = require("path");
const prisma = new PrismaClient();


class CategoryController
{
    // Создание новой категории
    async createNewCategory(req, res)
    {
        try {
            const { name } = req.body;
            const isCategoryExists = await prisma.category.findFirst
            (
                { data: { name: name } }
            );

            if (isCategoryExists) return res.json({ message: "Данная категория уже существует" });
            else
            {
                const newCategory = await prisma.category.create
                (
                    { data: { name: name} }
                );

                return res.json(newCategory);
            }
        } catch(e) {
            console.log(e);
        }
    }

    // Изменение категории
    async updateCategory(req, res)
    {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const isCategoryExists = await prisma.category.findUnique
            (
                { where: { id: parseInt(id) } }
            );

            if (!isCategoryExists) return res.status(404).json({ message: "Категория не найдена" });
            else
            {
                const updatedCategory = await prisma.category.update
                (
                    {
                        where: { id: parseInt(id) },
                        data: { name: name }
                    }
                );
                
                return res.json(updatedCategory);
            }
        } catch(e) {
            console.log(e);
        }
    }

    // Удаление категории
    async deleteCategory(req, res)
    {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const isCategoryExists = await prisma.category.findUnique
            (
                { where: { id: parseInt(id) } }
            );

            if (!isCategoryExists) return res.status(404).json({ message: "Категория не найдена" });
            else
            {
                const deletedCategory = await prisma.category.delete
                (
                    { where: { name: name }}
                );

                return res.json(deletedCategory);
            }
        } catch(e) {
            console.log(e);
        }
    }

    // Получение всех категорий
    async getAllCategories(req, res)
    {
        try {
            const categories = await prisma.category.findMany();
            console.log(categories);
            return res.json(categories);
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new CategoryController();