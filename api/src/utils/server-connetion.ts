import mongoose from "mongoose";
import HttpException from "./http-exception";

export const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL || "");
    console.log("Connect db succesffully.");
  } catch (error) {
    throw new HttpException(500, { error });
  }
};
