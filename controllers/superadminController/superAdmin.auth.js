import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import { bcryptConfig } from "../../db/connect.js";
import { signupValidator } from "../../validators/user.validator.js";

// Superadmin setup script
export default class superadminController {
  static async signup(req, res) {
    const { error } = signupValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    try {
      const existingSuperadmin = await User.findOne({ role: "superadmin" });

      if (existingSuperadmin) {
        return res.status(409).json({
          status: "failed",
          message: "Superadmin already exists",
        });
      }

      const saltRound = bcryptConfig.bcrypt_salt_round;
      const hashedPassword = bcrypt.hashSync(req.body.password, saltRound);

      const superadmin = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        referralCode: req.body.referralCode,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        role: "superadmin",
      });

      await superadmin.save();
      res.status(201).json({
        data: superadmin,
        status: "success",
        message: "Superadmin has been created",
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
