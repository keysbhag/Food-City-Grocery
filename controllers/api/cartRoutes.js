const router = require("express").Router();
const { User, Category, Product, Cart } = require("../models");
const withAuth = require("../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newItem = await Cart.create({
      user_id: req.session.user_id,
      ...req.body,
    });

    res.status(200).json(newItem);
  } catch (err) {
    res.status(400).json(err);
  }
});




module.exports = router;