// import models
const Product = require("./Product");
const Category = require("./Category");
const Cart = require("./cart");
const User = require("./User");

// Products belongsTo Category
Product.belongsTo(Category, { foreignKey: "category_id" });

// Categories have many Products
Category.hasMany(Product, { foreignKey: "category_id" });

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(User, {
  through: {
    model: Cart,
  },
  onDelete: "CASCADE",
});

// Tags belongToMany Products (through ProductTag)
User.belongsToMany(Product, {
  through: {
    model: Cart,
  },
  onDelete: "CASCADE",
});

module.exports = {
  Product,
  Category,
  User,
  Cart,
};