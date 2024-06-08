import { Router } from "express";
import {
  getUsers,
  getUserById,
  CreatUser,
} from "../controllers/user.controller";

const router = Router();

// /api/users

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", CreatUser);

export default router;
