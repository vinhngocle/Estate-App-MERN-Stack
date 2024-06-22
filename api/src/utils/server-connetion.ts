import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log("Connect db succesffully."))
    .catch((error) => console.log(error));
};
