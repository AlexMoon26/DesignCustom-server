import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { likeCloth } from "../controllers/cloth.js";

const router = express.Router();

router.post("/:id/like", verifyToken, likeCloth);

export default router;
