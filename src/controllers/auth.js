import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const register = async (req, res) => {
    try {
        const { firstName, surName, phone, email, password, picturePath } = req.body;


        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            surName,
            phone,
            email,
            password: passwordHash,
            picturePath,
        });
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const login = async (req, res) => {
    console.log("login triggered");
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email: email });
        if (!user) return res.status(404).json({ error: "Такой пользователь не найден" })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Неверно введенные данные" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user._doc.password;

        res.status(200).json({ token, user })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) return res.status(404).json({ error: "Пользователь не найден" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user._doc.password;
        res.status(200).json({ token, user })
    } catch (err) {
        res.status(403).json({ error: "Нет доступа" })
    }
}