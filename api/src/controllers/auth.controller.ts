import { Router, Request, Response, NextFunction } from "express";
import { createUser, login, verifyEmail, checkEmailVerified } from "../services/auth.service"
import HttpException from "../utils/http-exception";

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
    const userVerify = await checkEmailVerified(req.body)
    if (userVerify?.isVerified === false) {
      throw new HttpException(401, { error: "User email is not verify.!!" })
    }

    const user = await login(req.body)
    res.status(200).json({ message: "Login user successfully.", data: user })
  } catch (error) {
    next(error)
  }
})

router.post("/auth/verify-email", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verify = await verifyEmail(req.body)
    if (verify.count === 0) {
      throw new HttpException(401, { error: "Invalid email token.!!" })
    }

    res.status(200).json({ message: "Verify email user successfully.", data: verify })
  } catch (error) {
    next(error)
  }
})

export default router;
