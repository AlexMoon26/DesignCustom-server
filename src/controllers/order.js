import User from "../models/User.js";
import Order from "../models/Order.js";

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

export const createOrder = async (req, res) => {
  try {
    const { user } = req;
    const findUser = await User.findById(user).populate("cart.item");

    if (!findUser || !findUser.cart || findUser.cart.length === 0) {
      return res.status(400).json({ message: "Корзина пуста" });
    }

    const orderItems = findUser.cart.map((cartItem) => ({
      cloth: cartItem.item._id,
      size: cartItem.sizes,
      color: cartItem.colors,
      quantity: cartItem.quantity,
      price: cartItem.item.cost,
    }));

    const totalPrice = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      user: user,
      items: orderItems,
      totalPrice: totalPrice,
      shippingAddress: req.body.shippingAddress || user.address,
    });

    await newOrder.save();

    user.cart = [];
    await user.save();

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
