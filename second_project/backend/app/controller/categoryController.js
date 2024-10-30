const { PrismaClient } = require("@prisma/client");
const path = require("path");
const prisma = new PrismaClient();


class CategoryController
{
    // Создание новой категории
    async createNewCategory(req, res)
    {
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
    }

    // Изменение категории
    async updateCategory(req, res)
    {
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
    }

    // Удаление категории
    async deleteCategory(req, res)
    {
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
    }

    // Получение всех категорий
    async getAllCategories(req, res)
    {
        const categories = await prisma.category.findMany();
        console.log(categories);
        // return res.json(categories);
    }
}

module.exports = new CategoryController();