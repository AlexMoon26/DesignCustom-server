import express from "express";
import {
  createOrder,
  getOrders,
  updateStatusOrder,
} from "../controllers/order.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/create", createOrder);
router.patch("/:id/status", updateStatusOrder);

export default router;
