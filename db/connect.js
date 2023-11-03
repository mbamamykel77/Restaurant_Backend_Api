import dotenv from "dotenv";
dotenv.config();

export const connectDB = {
  mongodb_connection_url: process.env.MongoURI,
};

export const bcryptConfig = {
  bcrypt_salt_round: +process.env.BCRYPT_SALT_ROUND,
};

export const jwtConfig = {
  jwt_key: process.env.JWT_SECRET
}