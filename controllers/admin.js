const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    isEdit:''
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
}
  exports.getEditProduct = (req, res, next) => {
    const isEditMode = req.query.isEditing;
  const productId = req.params.productId;

  Product.findProductById(productId, (product) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "",
      product: product,
      isEdit: isEditMode,
    });
  });
}

exports.saveModifedProduct = (req, res, next) => {
  const reqBody = req.body;
  const id = reqBody.id;
  const modifiedTitle = reqBody.title;
  const modifiedImgUrl = reqBody.imageUrl;
  const modifedDesc = reqBody.description;
  const modifiedPrice = reqBody.price;
  const modifiedProduct = new Product(
    id,
    modifiedTitle,
    modifiedImgUrl,
    modifedDesc,
    modifiedPrice
  );
  modifiedProduct.saveModifiedFile();
  res.redirect('/admin/products');
};

exports.removeProduct = (req, res, next) => {
  const productId = req.body.id;

  Product.remove(productId);
  res.redirect('/admin/products');
};



