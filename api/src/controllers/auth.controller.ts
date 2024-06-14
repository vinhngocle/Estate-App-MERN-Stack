import { Router, Request, Response, NextFunction } from "express";
import { createUser, login, verifyEmail, existUser } from "../services/auth.service"
import HttpException from "../utils/http-exception";
import { validationResult, checkSchema } from "express-validator";
import { loginShema, registerSchema, verifySchema } from "../utils/validation/authSchema";

const router = Router();

router.post("/auth/register", checkSchema(registerSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.array() });
    }

    const checkUser = await existUser(req.body)
    if (checkUser) {
      throw new HttpException(400, { error: "User has been registered." })
    }

    const user = await createUser(req.body)
    res.status(201).json({ message: "Create user successfully.", data: user })
  } catch (error) {
    next(error)
  }
})

router.post("/auth/login", checkSchema(loginShema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.array() });
    }

    const userVerify = await existUser(req.body)
    if (userVerify?.isVerified === false) {
      throw new HttpException(401, { error: "User email is not verify.!!" })
    }

    const user = await login(req.body)
    res.status(200).json({ message: "Login user successfully.", data: user })
  } catch (error) {
    next(error)
  }
})

router.post("/auth/verify-email", checkSchema(verifySchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.array() });
    }

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
