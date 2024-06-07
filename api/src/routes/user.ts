import { Router } from 'express'
import { getUsers, getUserById } from '../controllers/user.controller';

const router = Router();

// /api/users

router.get("/", getUsers)

router.get("/:id", getUserById)

export default router;