import express from "express";
const app = express();
const PORT = 8800;

app.use("/api/test", (req, res) => {
  res.send("It works");
});

app.listen(PORT, () => {
  console.log("Server is running");
});
