import express from "express";
import cookieParser from "cookie-parser";
import route from "./routes/route.js";
const app = express();
const PORT = 8800;

app.use(express.json());
app.use(cookieParser());

app.use("/api/", route);

app.listen(PORT, () => {
  console.log("Server is running");
});
