const sequelize = require('../config/connection');
const { User, Product, Category, Cart } = require('../models');

const userData = require('./userData.json');
const productData = require('./productData.json');
const categoryData = require('./categoryData.json');
const cartData = require('./cartData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    await Category.bulkCreate(categoryData);

    await Product.bulkCreate(productData);

    await Cart.bulkCreate(cartData);

    process.exit(0);
}


seedDatabase();