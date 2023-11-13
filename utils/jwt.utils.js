import jwt from "jsonwebtoken";
import { jwtConfig } from "../db/connect.js";


export function genToken(user) {
    const payload = {
      email: user.email,
    };
    const token = jwt.sign(payload, jwtConfig.jwt_key, { expiresIn: 60 * 60 * 24 });
    return token;
  }
  
  
  export function authToken(token) {
    return jwt.verify(token, jwtConfig.jwt_key);
  }