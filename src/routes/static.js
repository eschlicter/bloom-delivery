const express = require("express");
const router = express.Router();

router.get("/", (requestAnimationFrame, res, next) => {
    res.send("Welcome to Bloom");
});

module.exports = router;