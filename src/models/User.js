import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "",
      min: 2,
      max: 50,
    },
    surName: {
      type: String,
      default: "",
      min: 2,
      max: 50,
    },
    phone: {
      type: String,
      min: 18,
      max: 18,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    locality: {
      type: String,
    },
    city: {
      type: String,
    },
    postcode: {
      type: String,
    },
    address: { type: String },
    cart: {
      type: [
        {
          _id: {
            type: String,
            required: true
          },
          item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cloth",
          },
          sizes: {
            type: String,
          },
          colors: {
            type: String,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],
      default: [],
    },
    likedClothes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cloth",
      },
    ],
    picturePath: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
