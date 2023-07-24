const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(productId, title, imageUrl, description, price) {
    this.id = productId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  saveModifiedFile() {
    if (this.id) {
      getProductsFromFile((products) => {
        const existingProdIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const modifiedProducts = [...products];
        modifiedProducts[existingProdIndex] = this;

        fs.writeFile(p, JSON.stringify(modifiedProducts), (err) => {
          console.log("err", err);
        });
      });
    }
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findProductById(pid, callbackFn) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === pid);
      callbackFn(product);
    });
  }

  static remove(id) {
    getProductsFromFile((products) => {
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        console.log("err", err);
      });
    });
  }
};
