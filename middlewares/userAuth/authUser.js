import { authToken } from "../../utils/jwt.utils.js";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";

// const authUser = async (req, res, next) => {
//   const token = req.headers?.authorization?.split(" ")[1];

//   if (!token) {
//     res.status(403).json({
//       status: "failed",
//       message: "You must provide an authorization token."
//     })
//   }

//   try {
//     const payload = await authToken(token);
//     req.user = payload;
//     next();

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       status: "failed",
//       message: "Access denied, invalid token.",
//     })
//   }
// };

const authUser = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token missing" });
  }

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", decoded);

    // req.user = await User.findById(decoded.id);
    const payload = await authToken(token);
    req.user = payload;
    next();
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Access denied, invalid token.",
    });
  }
};

export default authUser;
