import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
const app = express();
const PORT = 8800;

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
