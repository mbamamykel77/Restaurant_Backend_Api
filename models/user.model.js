import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [false, "please tell us your name"],
    },
    email: {
      type: String,
      required: [false, "please tell us your email address"],
      unique: true,
      lowercase: true,
      validator: {
        match: [
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          "Please add a valid email string to the email path.",
        ],
      },
    },
    mobile: {
      type: String,
      required: false,
    },
    referralCode: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: [false, "please provide a password"],
      minlength: 6,
    },
    confirmPassword: {
      type: String,
      required: [false, "Confirmation of the user's password"],
      minlength: 6,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
