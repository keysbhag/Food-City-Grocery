const router = require("express").Router();
const { User, Category, Product, Cart } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      attributes: ['id','category_name'],  
      include: [
        {
          model: Product,
          attributes: ['id','product_name', 'price'],
        },
      ],
    });
    // Serialize data so the template can read it
    const categories = categoryData.map((category) => category.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      categories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/category/:id", async (req, res) => {
  try {
    const prodData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["product_name", "price", "stock"],
        },
      ],
    });

    const productsByCat = prodData.get({ plain: true });

    res.render("category", {
      ...productsByCat,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/cart", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const cartData = await User.findByPk(req.session.user_id, {
      attributes: ['username','email'],
      include: [
        { 
          model: Product,
          through: {
            model: Cart,
            attributes: ['id','product_id','user_id','quantity']
          }
        }
      ],
    });

    const userCart = cartData.get({ plain: true });

    res.render("checkout", {
      ...userCart,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product, 
        through: { model: Cart}
      }]
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
