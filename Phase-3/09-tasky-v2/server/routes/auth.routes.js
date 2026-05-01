import express, { request } from 'express'
import { verifyEmail, verifyPhone, requestEmailUpdate } from '../controllers/auth.controllers.js'
import { authMiddleware } from '../middlewares/auth.middlewares.js'
import { updateEmail } from '../controllers/auth.controllers.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'user router is working just fine'
    })
})

router.get('/verify/email/:userId/:token', verifyEmail)
router.get('/verify/phone/:userId/:token', verifyPhone)
router.post('/request/update/email/', authMiddleware, requestEmailUpdate)
router.post('/update/email/', authMiddleware, updateEmail)

router.use((req, res)=> {
    return res.send({
        success: false,
        message: 'Route not found'
    })
})

export default router
