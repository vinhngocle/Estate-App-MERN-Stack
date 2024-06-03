import express from "express";
import postRoute from "./post.route.js";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import chatRoute from "./chat.route.js";
import messageRoute from "./message.route.js";

const route = express();

route.use("/post", postRoute);
route.use("/auth", authRoute);
route.use("/user", userRoute);
route.use("/chat", chatRoute);
route.use("/message", messageRoute);

export default route;
