const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController")

router.get("/cart", cartController.index);
router.post("/cart/:id", cartController.show);
module.exports = router;