import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import clothRoutes from "./routes/cloth.js";
import { connectDB } from "./config/db.js";
import { register } from "./controllers/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config({ path: ".env.dev" });

app.use("/auth", authRoutes);
app.post("/auth/register", register);

app.use("/cloth", clothRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[server] alive on ${PORT}`);
  });
});
