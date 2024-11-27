const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CartController {
  async getCart(req, res) {
    try {
      // console.log(req.params.id);
      const carts = await prisma.cart.findMany({
        distinct: ["product_id", "user_id"],
        where: {
          price: null,
          user_id: parseInt(req.params.id),
        },
        include: {
          product: true,
          user: true,
          // _count: {
          //   select: {
          //     product: true,
          //   },
          // },
        },
      });

      console.log(carts);

      res.status(200).json(carts);
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(req, res) {
    try {
      // Проверяем, есть ли товар у пользователя, который ещё не был заказан (у незаказанного товара остаётся пустая цена в корзине)
      let existingCart = await prisma.cart.findFirst({
        where: {
          user_id: req.body.user_id,
          product_id: req.body.product_id,
          price: null,
        },
      });
      console.log(existingCart);
      if (existingCart) {
        // сохраняем обновленную запись в базе данных
        existingCart = await prisma.cart.update({
          where: {
            id: existingCart.id,
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            price: null,
          },
          data: {
            count: existingCart.count++,
          },
        });
      } else {
        // Если товара в корзине нет, создаем новую запись
        
        const newCart = await prisma.cart.create({
          data: {
            id: req.body.id,
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            count: 1,
          },
        });
        res.status(200).json(newCart);
        return;
      }

      res.status(200).json(existingCart);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteProductFromCart(req, res) {
    try {
      let existingCart = await prisma.cart.findFirst({
        where: {
          user_id: req.body.user_id,
          product_id: req.body.product_id,
          price: null,
        },
      });

      console.log(existingCart);

      if (!existingCart) {
        // Если товар не найден в корзине, отправляем сообщение об ошибке
        return res.status(404).json({
          message: "Товар не найден в корзине",
        });
      }

      if (existingCart.count > 1) {
        // Если количество товара больше 1, уменьшаем его на единицу
        existingCart = await prisma.cart.update({
          where: {
            id: existingCart.id,
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            price: null,
          },
          data: {
            count: existingCart.count--,
          },
        });

        res.status(200).json(existingCart);
      } else {
        existingCart = await prisma.cart.delete({
          where: {
            id: existingCart.id,
          },
        });

        res.status(200).json(existingCart);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CartController();  