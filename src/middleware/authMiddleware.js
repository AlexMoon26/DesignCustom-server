import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const verifyToken = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

            next();

        } catch (err) {
            res.status(401).json({ error: "Не авторизован" });
        }
    } else res.status(401).json({ error: "Ошибка получения токена" })
};

export const verifyAdminToken = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = req.user = await User.findById(decoded.id).select("-password");

            if (user.role !== "admin") {
                return res.status(403).json({ error: "Ошибка доступа" })
            }

            next();

        } catch (err) {
            res.status(401).json({ error: "Не авторизован" });
        }
    } else res.status(401).json({ error: "Ошибка получения токена" })
};