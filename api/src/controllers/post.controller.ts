import { Router, Request, Response, NextFunction } from "express";
import {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost
} from "../services/post.service"
import auth from "../middleware/auth.middleware";
import { checkSchema, validationResult } from 'express-validator'
import { createPostSchema } from "../utils/validation/postSchema";

const router = Router();

router.get("/post/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await getAllPost()
    res.status(200).json({ message: "Get posts successfully.", data: posts })
  } catch (error) {
    next(error)
  }
})

router.get("/post/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await getPostById(Number(req.params.id));
    res.status(200).json({ message: "Get post successfully.", data: post })
  } catch (error) {
    next(error)
  }
})

router.post("/post/", checkSchema(createPostSchema), auth.require, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.array() });
    }

    const post = await createPost(req.body.postData, req.body.postDetail, req.user?.email as string);
    res.status(201).json({ message: "Create post successfully.", data: post })
  } catch (error) {
    next(error)
  }
})

router.put("/post/:id", checkSchema(createPostSchema), auth.require, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await updatePost(req.body.postData, req.body.postDetail, Number(req.params.id), req.user?.email as string)
    res.status(201).json({ message: "Update post successfully.", data: post })
  } catch (error) {
    next(error)
  }
})

router.delete("/post/:id", auth.require, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await deletePost(Number(req.params.id));
    res.status(200).json({ message: "Delete post successfully.", data: post })
  } catch (error) {
    next(error)
  }
})

export default router;