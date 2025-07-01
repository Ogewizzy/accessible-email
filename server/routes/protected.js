
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({
    message: "You have accessed a protected route!",
    user: req.user,
  });
});

module.exports = router;