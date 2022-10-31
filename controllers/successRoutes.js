const router = require("express").Router();
const { User, Category, Product, Cart } = require("../models");
const withAuth = require("../utils/auth");


// shows a success page with order confirmation
router.get("/", withAuth, async (req, res) => {
  try {
    const orderData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Product,
          through: {
            model: Cart,
          },
        },
      ],
    });
    
    const order = orderData.get({ plain: true });

    res.render("success", {
      ...order,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;