import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import route from "./routes/route.js";

const app = express();
const PORT = 8800;

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use("/api/", route);

app.listen(PORT, () => {
  console.log("Server is running");
});
