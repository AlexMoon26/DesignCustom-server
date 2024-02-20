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