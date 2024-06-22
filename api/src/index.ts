import express, { NextFunction, Request, Response } from "express";
import routes from "./routes/routes";

const app = express();

app.use(routes);

app.get("/test-api", (req, res) => {
  res.send({ data: ["John", "Tommy", "Linda"] });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
