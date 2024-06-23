import jwt from "jsonwebtoken";
import UserModel from "../model/user.model";

const generateToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY || "superSecretKey", {
    expiresIn: "7d",
  });
};

export default generateToken;
