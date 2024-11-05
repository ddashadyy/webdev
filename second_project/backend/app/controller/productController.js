const { PrismaClient } = require("@prisma/client");
const path = require("path");
const prisma = new PrismaClient();

class ProductController {
  // добавление товара
  async createNewProduct(req, res) {
    try {
      const { name, price, description, categoryId, count, urlImage } =
        req.body;
      const newProduct = await prisma.product.create({
        data: {
          name: name,
          price: parseFloat(price),
          description: description,
          category_id: parseInt(categoryId),
          count: parseInt(count),
          url_image: urlImage,
        },
      });
      console.log(newProduct);
      res.status(200).json(newProduct);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  // обновление товара
  async updateProductById(req, res) {
    try {
      const { id } = req.params;
      const { name, price, description, count, urlImage } = req.body;

      const updatedProduct = await prisma.product.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: name,
          price: parseFloat(price),
          description: description,
          count: parseInt(count),
          url_image: urlImage,
        },
      });

      console.log(updatedProduct);
      res.status(200).json(updatedProduct);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  // удаление товара
  async deleteProductById(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await prisma.product.delete({
        where: { id: parseInt(id) },
      });

      console.log(deletedProduct);
      res.status(200).json(deletedProduct);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  // получение списка товаров
  async getAllProducts(req, res) {
    try {
      const products = await prisma.product.findMany({
        include: { category: true },
      });

      console.log(products);
      res.status(200).json(products);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  // получение товара по id
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const gottenProductById = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: { category: true },
      });

      console.log(gottenProductById);
      res.status(200).json(gottenProductById);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  // получение товара по категории
  async getProductByCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const gottenProductByName = await prisma.product.findFirst({
        where: { category_id: parseInt(categoryId) },
        include: { category: true },
      });

      console.log(gottenProductByName);
      res.status(200).json(gottenProductByName);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

module.exports = new ProductController();
