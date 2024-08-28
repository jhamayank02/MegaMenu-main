const express = require ("express")
const router = express.Router()
const {authMiddleware} = require("../middlewares/authMiddleware")

const {createOrder, verifyPayments ,applyCode}  = require("../controller/paymentCtrl")

router.post("/createOrder" , createOrder)
router.post("/verifyPayments" , verifyPayments)
router.post("/couponcode", authMiddleware ,applyCode);

module.exports = router;

// const express = require("express");
// const { initializePayment, checkPaymentStatus ,applyCode} = require("../controller/paymentCtrl");
// const { createOrder, checkUser } = require("../controller/orderCtrl");
// const { authMiddleware } = require("../middlewares/authMiddleware");

// const router = express.Router();
// router.post("/cod", checkUser, createOrder);
// router.post("/pay", initializePayment);
// router.post("/check", checkPaymentStatus,createOrder);
// router.post("/couponcode", authMiddleware ,applyCode);


// module.exports = router;
