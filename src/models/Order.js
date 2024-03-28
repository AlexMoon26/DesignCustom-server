const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      cloth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cloth",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  shippingAddress: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.pre("save", async function (next) {
  const order = this;
  order.totalPrice = 0;
  for (const item of order.items) {
    const cloth = await Cloth.findById(item.cloth);
    order.totalPrice += cloth.cost * item.quantity;
  }
  next();
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
