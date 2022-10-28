const router = require("express").Router();
const { User, Category, Product, Cart } = require("../../models");
const withAuth = require("../../utils/auth");
const luhn = require("luhn");
let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear();

router.post("/", withAuth, async (req, res) => {
  try {
    let validCard = luhn.validate(req.body.creditCard);
    let validMonth = req.body.month > month;
    let validYear = req.body.year > year;
    console.log(`${validCard},${validMonth},${validYear}`)

    if (validCard && validMonth && validYear) {
      const newItem = await Cart.destroy({
        where: {
          user_id: req.session.user_id,
        },
      });
      res.status(200).json(`You have successfully cashed out ${newItem}!`);
    } else {
      res.status(404).json({ message: `entered card info is invalid! ${err}`});
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
