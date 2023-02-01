const express = require("express");
const router = express.Router();

const { isAdmin } = require("../middleware/isAdmin");
const { isAuth } = require("../middleware/isAuth");
const {
  getAllOrders,
  getMyOrders,
  createOrder,
} = require("../controller/order");

router.get("/my-orders", isAuth, getMyOrders);
router.get("/orders", isAuth, isAdmin, getAllOrders);
router.post("/orders/new", isAuth, createOrder);

module.exports = router;
