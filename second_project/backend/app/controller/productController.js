const { PrismaClient } = require("@prisma/client");
const path = require("path");
const prisma = new PrismaClient();


class ProductController 
{
    // Создание нового продукта
    async createNewProduct(req, res) 
    {
        try {
            const { name, price, description, count, urlImage } = req.body;
            const { categoryId } = req.params;

            const isProductExists = await prisma.product.findFirst
            (
                { where: { name: name } }
            );

            if (isProductExists) return res.json({ message: "Данный продукт уже существует" });
            else 
            {
                const newProduct = await prisma.product.create
                (
                    {
                        data:
                        {
                            name: name,
                            price: parseFloat(price),
                            description: description,
                            category_id: parseInt(categoryId),
                            count: parseInt(count),
                            url_image: urlImage
                        }
                    }
                );
                return res.json(newProduct);
            }
        } catch(e) {
            console.log(e);
        }
    }

    // Изменение продукта
    async updateProduct(req, res) 
    {
        try {
            const { id } = req.params;
            const { name, price, description, count, urlImage } = req.body;

            const isProductExists = await prisma.product.findUnique
            (
                { where: { id: parseInt(id) } }
            );

            if (!isProductExists) return res.status(404).json({ message: "Продукт не найден" });
            else
            {
                const updatedProduct = await prisma.product.update
                (
                    {
                        where:
                        {
                            id: parseInt(id),
                        },
                        data:
                        {
                            name: name,
                            price: parseFloat(price),
                            description: description,
                            count: parseInt(count),
                            url_image: urlImage
                        }
                    }
                );
                
                return res.json(updatedProduct);
            }
        } catch(e) {
            console.log(e);
        }
    }

    // Изменение категории продукта
    async updateProductsCategory(req, res)
    {
        try {
            const { id, categoryId } = req.params;
            const isProductExists = await prisma.product.findUnique
            (
                { where: { id: parseInt(id) } }
            );

            if (!isProductExists) return res.status(404).json({ message: "Продукт не найден" });

            const updatedProductsCategory = await prisma.product.update
            (
                {
                    where: { id: parseInt(id) },
                    data: { category_id: parseInt(categoryId) }
                }
            );

            return res.json(updatedProductsCategory);
        } catch(e) {
            console.log(e);
        }
    }

    // Удаление продукта
    async deleteProduct(req, res)
    {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const isProductExists = await prisma.product.findUnique
            (
                { where: { id: parseInt(id) } }
            );

            if (!isProductExists) return res.status(404).json({ message: "Продукт не найден" });

            const deletedProduct = await prisma.product.delete
            (
                { where: { name: name } }
            );

            return res.json(deletedProduct);
        } catch(e) {
            console.log(e);
        }
    }

    async getAllProducts(req, res)
    {
        try {
            const products = await prisma.product.findMany();
            console.log(products)
            return res.json(products);
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new ProductController();