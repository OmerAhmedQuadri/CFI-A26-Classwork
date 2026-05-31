import express from 'express'
import { authMiddleware } from '../middlewares/auth.middlewares.js'
import { createShortUrl, getUserUrls } from '../controllers/url.controllers.js'

const router = express.Router()

router.use(authMiddleware)
router.post('/create', createShortUrl)
router.get('/', getUserUrls)

export default router
