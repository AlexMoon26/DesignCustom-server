import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createCloth,
  editCloth,
  getAllCloth,
  likeCloth,
} from "../controllers/cloth.js";

const router = express.Router();
router.get("/getAllCloth", getAllCloth);
router.post("/create", verifyToken, createCloth);
router.post("/:id/like", verifyToken, likeCloth);
router.post("/:id", verifyToken, editCloth);

export default router;
