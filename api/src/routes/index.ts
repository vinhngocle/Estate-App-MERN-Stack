import { Router } from 'express'
import userRoute from './user'

const router = Router();

router.use("/api/user", userRoute)


export default router;