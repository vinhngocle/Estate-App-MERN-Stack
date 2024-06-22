/* eslint-disable prettier/prettier */
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import HttpException from "./utils/http-exception";
import routes from "./routes/routes";
import roleModel from "./database/role";
import { connectDB } from "./utils/server-connetion";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/test-api", (req, res) => {
  res.send(["John", "Tommy", "Linda"]);
});

dotenv.config();
app.use(express.json());
app.use(cors);
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));

app.use(routes);

app.use(
  (
    err: Error | HttpException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // @ts-ignore
    if (err && err.errorCode) {
      // @ts-ignore
      res.status(err.errorCode).json(err.message);
    } else if (err) {
      res.status(500).json(err.message);
    }
  }
);

// connect mongodb
connectDB();

// seeds roles
roleModel.find().then((data) => {
  if (data.length === 0) {
    const roles = [{ name: "Admin" }, { name: "Teacher" }, { name: "Student" }];
    roleModel.insertMany(roles);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
