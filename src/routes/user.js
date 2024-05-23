import express from "express";
import {
  addIntoCart,
  deleteIntoCart,
  updateProfile,
} from "../controllers/user.js";

const router = express.Router();

router.put("/profile", updateProfile);
router.post("/cart", addIntoCart);
router.delete("/cart/:id", deleteIntoCart);

export default router;
