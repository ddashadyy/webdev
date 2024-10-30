const { PrismaClient } = require("@prisma/client");
const path = require("path");
const prisma = new PrismaClient();

// ближе к разработке клиентской части будет видно как лучше сделать контроллер корзины

class CartController
{
    // Создание новой корзины
    async createNewCart(req, res)
    {
        const { id } = req.params;
        const { userId, productId, count, price } = req.body;

        const isCartExists = await prisma.cart.findUnique
        (
            { where: { id: id } }
        );

        if (isCartExists) return res.json({ message: "Корзина уже создана" });
        else
        {
            const newCart = await prisma.cart.create
            (
                {
                    data:
                    {
                        user_id: parseInt(userId),
                        product_id: parseInt(productId),
                        count: parseInt(count),
                        price: parseFloat(price)
                    }
                }
            );
            return res.json(newCart);
        }
    }

    // Изменение корзины
    async updateCart(req, res)
    {
        const { id } = req.params;
        const { userId, productId, count, price } = req.body;

        const isCartExists = await prisma.cart.findUnique
        (
            { where: { id: id } }
        );

        if (!isCartExists) return res.status(404).json({ message: "Корзина не создана" });
        else
        {
            const updatedCart = await prisma.cart.update
            (
                {
                    where: { id: parseInt(id) },
                    data: 
                    {
                        user_id: parseInt(userId),
                        product_id: parseInt(productId),
                        count: parseInt(count),
                        price: parseFloat(price)
                    }
                }
            );

            return res.json(updatedCart);
        }
    }

    // Удаление содержимого корзины
    async deleteCart(req, res)
    {
        const { id } = req.params;
        const { userId, productId, count, price } = req.body;

        const isCartExists = await prisma.cart.findUnique
        (
            { where: { id: id } }
        );

        if (!isCartExists) return res.status(404).json({ message: "Корзина не найдена" });
        else
        {
            const deletedCart = await prisma.cart.delete
            (
                { where: { id: parseInt(id) } }
            );
        }
    }

}

module.exports = new CartController();