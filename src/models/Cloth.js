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
      type: [String],
      default: "",
    },
    count: {
      type: Number,
      default: 0,
    },
    outlay: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "Описания нет",
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    colors: {
      type: [String],
      default: ["black"],
    },
    category: {
      type: String,
      enum: ["tshirts", "designer-clothes"],
      default: "tshirts",
    },
  },
  { timestamps: true }
);

const Cloth = mongoose.model("Cloth", ClothSchema);

export default Cloth;
