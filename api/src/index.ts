import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import routes from "./routes/routes";
import HttpException from "./utils/http-exception";
import swaggerDocs from "../docs/swagger.json";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.static("public"));
app.use(routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
