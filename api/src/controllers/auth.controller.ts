import { Router, Request, Response, NextFunction } from "express";
import { createUser, login } from "../services/auth.service"

const router = Router();

router.post("/auth/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body)
    res.status(201).json({ message: "Create user successfully.", data: user })
  } catch (error) {
    next(error)
  }
})

router.post("/auth/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await login(req.body)
    res.status(200).json({ message: "Login user successfully.", data: user })
  } catch (error) {
    next(error)
  }
})

export default router;
