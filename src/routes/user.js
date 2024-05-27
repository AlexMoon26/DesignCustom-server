import express from "express";
import {
  addIntoCart,
  deleteIntoCart,
  getLikedCloth,
  getUserOrders,
  updateAddress,
  updateProfile,
} from "../controllers/user.js";

const router = express.Router();

router.get("/favorite", getLikedCloth);
router.get("/orders", getUserOrders);
router.put("/profile", updateProfile);
router.put("/address", updateAddress);
router.post("/cart", addIntoCart);
router.delete("/cart/:id", deleteIntoCart);

export default router;
