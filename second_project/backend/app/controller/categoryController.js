const { PrismaClient } = require("@prisma/client");
const path = require("path");
const prisma = new PrismaClient();


class CategoryController
{
    // Получение всех категорий
    async getAllCategories(req, res)
    {
        try 
        {
            const categories = await prisma.category.findMany();
            console.log(categories);
            res.status(200).json(categories);
        } 
        catch(e) 
        {
            console.log(e);
            res.status(500).json(e);
        }
    }

    // Добавление категории 
    async createNewCategory(req, res)
    {
        try 
        {
            const { name } = req.body.name;
            console.log(name);
            const isCategoryExists = await prisma.category.findUnique
            (
                { where: { name: name } }
            );

            if (isCategoryExists) res.json({ message: "Данная категория уже существует" });
            else
            {
                const newCategory = await prisma.category.create
                (
                    { data: { name: name} }
                );

                res.status(200).json(newCategory);
            }
        } 
        catch(e) 
        {
            console.log(e);
            res.status(500).json(e);
        }
    }
    
    // Обновление категории по id
    async updateCategoryById(req, res)
    {
        try 
        {
            const id = req.params.id;
            const name = req.body.name;

            const updatedCategory = await prisma.category.update
            (
                {
                    where: { id: parseInt(id) },
                    data: { name: name }
                }
            );
            
            res.status(200).json(updatedCategory);
        }
        catch(e) 
        {
            console.log(e);
            res.status(500).json(e);
        }
    }

    // Удаление категории по id
    async deleteCategoryById(req, res)
    {
        try
        {
            const { id } = req.params;
            const deletedCategoryById = await prisma.category.delete
            (
                { where: { id: parseInt(id) } }
            );
            
            console.log(deletedCategoryById);
            res.status(200).json(deletedCategoryById);
        }
        catch(e) 
        {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async getCategoryById(req, res)
    {
        try
        {
            const { id } = req.params;
            const gottenCategoryById = await prisma.category.findUnique
            (
                { where: { id: parseInt(id) } }
            );

            console.log(gottenCategoryById);
            res.status(200).json(gottenCategoryById);
        }
        catch(e)
        {
            console.log(e);
            res.status(500).json(e);
        }
    }

    // Получение категории по названию
    async getCategoryByName(req, res)
    {
        try
        {
            const name = req.params.name;
            const gottenCategoryByName = await prisma.category.findUnique
            (
                { where: { name: name } }
            );

            console.log(gottenCategoryByName);
            res.status(200).json(gottenCategoryByName);
        }
        catch(e)
        {
            console.log(e);
            res.status(500).json(e);
        }
    }
}

module.exports = new CategoryController();