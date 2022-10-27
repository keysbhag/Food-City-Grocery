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

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const itemData = await Cart.destroy({
      where: {
        id: req.params.id, // gonna be the id of the cart item, in 'data-id:'
        user_id: req.session.user_id,
      },
    });

    if (!itemData) {
      res.status(404).json({ message: "No cart item found with this id!" });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;