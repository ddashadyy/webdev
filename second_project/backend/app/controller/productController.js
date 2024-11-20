const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
var fs = require("fs");
const path = require("path");
var uuid = require("uuid");
var multiparty = require("multiparty");

class ProductController {
  // добавление товара
  async createNewProduct(req, res) {
    var form = new multiparty.Form();
    await form.parse(req, async (err, fields, files) => {
      try {
        var mimeType = files.image[0].headers["content-type"];

        const expansion = mimeType.split("/")[1]; // из "image/png" нужно извлечь только расширение

        var newName = uuid.v4() + "." + expansion; // вызываем функцию v4() для того, чтобы уникальный идентификатор был сгенерирован случайным образом
        var link = "./files/" + newName;

        fs.copyFile(files.image[0].path, link, (err) => {
          if (err) {
            // res.json(err);
            console.log(err);
          }
          fs.unlink(files.image[0].path, (err) => {
            if (err) {
              console.log(err);
            }
          });
        });

        const newProduct = await prisma.product.create({
          data: {
            name: fields.name[0],
            price: parseFloat(fields.price[0]),
            description: fields.description[0],
            category_id: parseInt(fields.category_id[0]),
            count: parseInt(fields.count[0]),
            url_image: `http://localhost:5000/${newName}`,
          },
        });
        console.log(newProduct);
        res.status(200).json(newProduct);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });
  }

  // обновление товара
  async updateProductById(req, res) {
    const form = new multiparty.Form();
    await form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.json(err);
      }

      const productId = req.params.id;
      let oldImageName = null;

      try {
        const product = await prisma.product.findUnique({
          where: {
            id: parseInt(productId),
          },
        });

        if (!product) {
          return res.json({ message: "Товар не найден" });
        }

        oldImageName = product.url_image;

        let newName;

        if (files.image && files.image.length > 0) {
          const mimeType = files.image[0].headers["content-type"];
          const expansion = mimeType.split("/")[1];
          newName = uuid.v4() + "." + expansion;
          var link = "./files/" + newName;

          fs.copyFile(files.image[0].path, link, (err) => {
            if (err) {
              console.log(err);
            }
            fs.unlink(files.image[0].path, (err) => {
              if (err) {
                console.log(err);
              }
            });
          });

          // удаляем старое изображение с диска
          if (oldImageName) {
            fs.unlink("./files/" + oldImageName, (err) => {
              if (err) {
                console.log(err);
              }
            });
          }
        }

        const updatedProduct = await prisma.product.update({
          where: {
            id: parseInt(productId),
          },
          data: {
            name: fields.name[0],
            price: parseFloat(fields.price[0]),
            description: fields.description[0],
            count: parseInt(fields.count[0]),
            url_image: `http://localhost:5000/${newName}`,
          },
        });

        console.log(updatedProduct);
        res.status(200).json(updatedProduct);
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });
  }

  // удаление товара
  async deleteProductById(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await prisma.product.delete({
        where: { id: parseInt(id) },
      });

      const imageURL = deletedProduct.url_image.split("/")[3];

      fs.unlink("./files/" + imageURL, (err) => {
        if (err) {
          res.json(err);
        }
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
