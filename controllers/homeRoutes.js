const router = require("express").Router();
const { User, Category, Product, Cart } = require("../models");
const withAuth = require("../utils/auth");

//send category, product to homepage.
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      attributes: ['id','category_name','filename'],  
      include: [
        {
          model: Product,
          attributes: ['filename'],
        },
      ],
    });

    const categories = categoryData.map((category) => category.get({ plain: true }));

    res.render("homepage", {
      categories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//send users to specific category-page with category specific products
router.get("/category/:id", async (req, res) => {
  try {
    const prodData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'filename'],
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

// sent users, product, cart to cart-page which will display their added cart items
router.get("/cart", withAuth, async (req, res) => {
  try {
    const cartData = await User.findByPk(req.session.user_id, {
      include: [
        { 
          model: Product,
          through: {
            model: Cart,
          }
        }
      ],
    });

    const userCart = cartData.get({ plain: true });
    
    res.render("cart", {
      ...userCart,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// sends users to a checkout form page with listed items and a form to add credit card info, a name and an address
router.get("/checkout", withAuth, async (req, res) => {
  try {
    const cartData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Product,
          through: {
            model: Cart,
          },
        },
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

//send user, product, cart to profile page where they can see their profile
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
