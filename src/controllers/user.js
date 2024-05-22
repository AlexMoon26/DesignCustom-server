import mongoose from "mongoose";
import User from "../models/User.js";

export const addIntoCart = async (req, res) => {
  try {
    const { user } = req;
    const { _id, colors, sizes } = req.body;

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const foundUser = await User.findById(user._id);

    if (!foundUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const newItemId = new mongoose.Types.ObjectId();

    const newItem = {
      _id: newItemId,
      item: _id,
      colors,
      sizes,
      quantity: 1,
    };

    foundUser.cart.push(newItem);
    await foundUser.save();

    res.status(200).json(foundUser.cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteIntoCart = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const foundUser = await User.findById(user._id).populate("cart.item");

    if (!foundUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const itemIndex = foundUser.cart.findIndex((item) => item._id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Товар не найден в корзине" });
    }

    foundUser.cart.splice(itemIndex, 1);

    await foundUser.save();

    res.status(200).json(foundUser.cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
