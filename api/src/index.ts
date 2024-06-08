import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import cors from "cors";
import helmet from "helmet";
import HttpException from "./utils/http-exception";

const app = express();
const PORT = 8800;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(router);

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
