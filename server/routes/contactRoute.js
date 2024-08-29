const express = require("express");
const {
  addContactus,
  getallContactUs,
  deleteContact,
  updateRemarkContact,
} = require("../controller/contactusCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/", getallContactUs);
router.post("/", addContactus);
router.put("/", updateRemarkContact);
router.delete("/:id", authMiddleware, isAdmin, deleteContact);
module.exports = router;
