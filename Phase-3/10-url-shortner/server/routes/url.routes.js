import express from 'express'
import { authMiddleware } from '../middlewares/auth.middlewares.js'
import { createShortUrl } from '../controllers/url.controllers.js'

const router = express.Router()

// router.use(authMiddleware)
router.post('/create', createShortUrl)

export default router
