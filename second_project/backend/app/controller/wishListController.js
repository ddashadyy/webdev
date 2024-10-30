const { PrismaClient } = require("@prisma/client");
const path = require("path");
const prisma = new PrismaClient();

// аналогичная история как и с корзиной
// продолжить потом

class WishListController 
{
    // Создание нового списка
    async createNewWishList(req, res)
    {
        try {
            const { comment } = req.body;

            const isWishListExists = await prisma.wishList.findFirst
            (
                { data: { comment: comment } }
            );
    
            if (isWishListExists) return res.json({ message: "Список уже существует" });
            else
            {
                const newWishList = await prisma.category.create
                (
                    { data: { comment: comment} }
                );
    
                return res.json(newWishList);
            }
        } catch(e) {
            console.log(e);
        }
    }

    // Изменение списка
    // async updateWishList(req, res)
    // {
        
    // }

}

module.exports = new WishListController();