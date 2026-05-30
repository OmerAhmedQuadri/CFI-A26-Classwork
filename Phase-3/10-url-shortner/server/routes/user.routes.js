import express from 'express'
import { authMiddleware } from '../middlewares/auth.middlewares.js'
import { getUserDetails } from '../controllers/user.controllers.js'
const router = express.Router()

router.use(authMiddleware)
router.get('/', getUserDetails)

export default router