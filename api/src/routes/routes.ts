import { Router } from "express";
import authController from "../controllers/auth.controller";
import userController from "../controllers/user.controller";
import articleController from "../controllers/article.controller";
import postController from "../controllers/post.controller";

const api = Router()
  .use(authController)
  .use(userController)
  .use(articleController)
  .use(postController)

export default Router().use("/api", api);
