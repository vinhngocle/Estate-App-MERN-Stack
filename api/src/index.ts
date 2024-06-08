import express from "express";
import router from "./routes";
import cors from 'cors'
import helmet from 'helmet'

const app = express();
const PORT = 8800;

app.use(express.json())
app.use(cors())
app.use(helmet())

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
