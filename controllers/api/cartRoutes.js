const router = require("express").Router();
const { User, Category, Product, Cart } = require("../../models");
const withAuth = require("../../utils/auth");

// POST new item cart and update stock
router.post("/", withAuth, async (req, res) => {
  try {
    const check = await Cart.findOne({
      where: {
        user_id: req.session.user_id, 
        product_id: req.body.product_id 
      },
    });
    if (check) {
      res.status(404).json(check);
    } else {
      const newItem = await Cart.create({
        user_id: req.session.user_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity, 
      });
      const change = 
        {
          stock: req.body.newStock
        };
      const stockData = await Product.update(change, {
        where: {
          id: req.body.product_id,
        },
      });

      res.status(200).json(`${newItem} + ${stockData}`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT (update) existing cart and update stock
router.put("/:id", withAuth, async (req, res) => {
  try {
    // updates entry
    const change = {
      user_id: req.session.user_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    };
    //cart.update overwrite
    const cartData = await Cart.update(change, {
      where: {
        id: req.params.id,
      },
    });
    const stockChange = {
      stock: req.body.newStock,
    };
    // stock update overwrite
    const stockData = await Product.update(stockChange, {
      where: {
        id: req.body.product_id,
      },
    });
    if (!cartData[0]) {
      res.status(404).json({ message: "No cart with this id!" });
      return;
    }
    res.status(200).json(`${cartData} + ${stockData}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE Route to delete items from the cart
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // destroys cart item depending the user and what the cart id is
    const itemData = await Cart.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    // changes stock of product
    const change = {
      stock: req.body.newStock,
    };
    const stockData = await Product.update(change, {
      where: {
        id: req.body.product_id,
      },
    });
    
    if (!itemData) {
      res.status(404).json({ message: "No cart item found with this id!" });
      return;
    }

    res.status(200).json(`${itemData} + ${stockData} `);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
