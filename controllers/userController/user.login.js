import User from "../../models/user.model.js";
import { signinValidator } from "../../validators/user.validator.js";
import bcrypt from "bcrypt"

export default class userloginController {
  static async signin(req, res) {
    const { error } = signinValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const user = await User.findOne({ email: req.body.email });
    try {
      if (!user) {
        return res.status(400).json({
          Status: "failed",
          message: "user does not exist",
        });
      }

      const hash = bcrypt.compareSync(req.body.password, user.password);
      if (!hash)
      {
        return res.status(400).json({
          Status: "failed",
          message: "email or password is incorrect",
        });
      }

      res.status(200).json({
        status: "success",
        message: "user login successful",
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "internal server error" });
    }
  }
}
