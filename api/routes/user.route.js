import express from "express";
import {
  getListUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.mwd.js";

const router = express.Router();

router.get("/", getListUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
// router.delete("/:id", verifyToken, deleteUser);

export default router;
