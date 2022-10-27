const router = require("express").Router();
const { User, Category, Product, Cart } = require("../models");
const withAuth = require("../utils/auth");

router.post("/", withAuth, async (req, res) => {
    
})


module.exports = router;