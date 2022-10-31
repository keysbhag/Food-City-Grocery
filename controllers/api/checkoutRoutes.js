const router = require("express").Router();
const { User, Category, Product, Cart } = require("../../models");
const withAuth = require("../../utils/auth");
const luhn = require("luhn");
let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// Uses Luhn's Algorithm and checks current month and date to see if the credit card entry is valid
router.post("/", withAuth, async (req, res) => {
  try {
    let validCard = luhn.validate(req.body.creditCard);
    let validMonth = req.body.month > month;
    let validYear = req.body.year >= year;
    console.log(`${validCard},${validMonth},${validYear}`)
    
    // if the expiry year is this year it will check the expiry month with the current month
    if(req.body.year == year){
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
    }
    //else it will only check to see if the year is valid     
    else if(req.body.year > year){
      if (validCard && validYear) {
        const newItem = await Cart.destroy({
          where: {
            user_id: req.session.user_id,
          },
        });
        res.status(200).json(`You have successfully cashed out ${newItem}!`);
      } else {
      res.status(404).json({ message: `entered card info is invalid! ${err}`});
      }
    } else {
      res.status(404).json({ message: `entered card info is invalid! ${err}`});
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
