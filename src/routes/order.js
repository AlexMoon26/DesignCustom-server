import express from "express";
import { createOrder, getUserOrders } from "../controllers/order.js";

const router = express.Router();

router.get("/", getUserOrders);
router.post("/create", createOrder);

export default router;
