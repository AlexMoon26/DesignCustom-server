import mongoose from "mongoose";
import User from "../models/User.js";
import Cloth from "../models/Cloth.js";
import Order from "../models/Order.js";

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

export const updateProfile = async (req, res) => {
  try {
    const { firstName, surName, email, phone } = req.body;

    const { user } = req;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { firstName, surName, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { region, city, index, address } = req.body;

    const { user } = req;
    const foundUser = await User.findById(user._id);

    if (!foundUser) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    foundUser.address = {
      region,
      city,
      index,
      address,
    };

    await foundUser.save();

    res
      .status(200)
      .json({ message: "Адрес успешно обновлен", address: foundUser.address });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getLikedCloth = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const likedClothes = await Cloth.find({ _id: { $in: user.likedClothes } });

    res.status(200).json(likedClothes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { user } = req;
    const findUser = await User.findById(user._id);

    if (!findUser) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const userOrders = await Order.find({ user: user._id }).populate(
      "items.cloth"
    );

    res.status(200).json(userOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
