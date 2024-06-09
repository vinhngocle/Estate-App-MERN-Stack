import { Router, Request, Response, NextFunction } from "express";
import { createUser } from "../services/auth.service"
import { UserModel } from "../models/user.model";

const router = Router();

router.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const user = await createUser(req.body.user)
    // res.json({ data: user })
  } catch (error) {
    next(error)
  }
})

export default router;
