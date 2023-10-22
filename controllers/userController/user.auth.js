import User from "../../models/user.model.js";
import { signupValidator } from "../../validators/user.validator.js";
import bcrypt from "bcrypt"
import { bcryptConfig } from "../../db/connect.js";

export default class userController {
  static async signup(req, res) {
    const { error } = signupValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    try {
      const emailExist = await User.find({ email: req.body.email });

      if (emailExist.length > 0) {
        return res.status(409).json({
          status: "failed",
          message: "An account with this email already exists",
        });
      }

      const saltRound = bcryptConfig.bcrypt_salt_round
      const hashedPassword = bcrypt.hashSync(req.body.password, saltRound);

      const user = {
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        referralCode: req.body.referralCode,
        password: req.body.password,
        password: hashedPassword,
        confirmPassword: req.body.confirmPassword,
        confirmPassword: hashedPassword
      };

      const newUser = await User.create(user);
      res.status(200).json({
        status: "Success",
        message: "User signup successful",
        data: {
          user: newUser,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failed",
        message: "internal error",
      });
    }
  }
}
