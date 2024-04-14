import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createCloth, likeCloth } from "../controllers/cloth.js";

const router = express.Router();
router.post("/create", verifyToken, createCloth);
router.post("/:id/like", verifyToken, likeCloth);

export default router;
