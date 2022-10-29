// import models
const Product = require("./product");
const Category = require("./category");
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
    unique: false,
  },
  onDelete: "CASCADE",
});

// Tags belongToMany Products (through ProductTag)
User.belongsToMany(Product, {
  through: {
    model: Cart,
    unique: false,
  },
  onDelete: "CASCADE",
});

module.exports = {
  Product,
  Category,
  User,
  Cart,
};
