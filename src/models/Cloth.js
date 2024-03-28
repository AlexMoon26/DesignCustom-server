import mongoose from "mongoose";

const ClothSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    pictures: {
      item: [
        {
          id: { type: Number, required: true },
          path: {
            type: String,
            required: true,
            default: "",
          },
        },
      ],
    },
    count: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "Описания нет",
    },
    sizes: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    colors: {
      type: String,
      default: "Черный(-ая)",
    },
    category: { name: { type: String, default: "" } },
  },
  { timestamps: true }
);

const Cloth = mongoose.model("Cloth", ClothSchema);

export default Cloth;
