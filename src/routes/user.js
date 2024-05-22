import express from "express";
import { addIntoCart, deleteIntoCart } from "../controllers/user.js";

const router = express.Router();

router.post("/cart", addIntoCart);
router.delete("/cart/:id", deleteIntoCart);

export default router;
