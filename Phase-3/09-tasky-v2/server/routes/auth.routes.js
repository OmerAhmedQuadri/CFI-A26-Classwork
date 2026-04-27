import express from 'express'
import { verifyEmail, verifyPhone } from '../controllers/auth.controllers.js'
const router = express.Router()

router.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'user router is working just fine'
    })
})

router.get('/verify/email/:userId/:token', verifyEmail)
router.get('/verify/phone/:userId/:token', verifyPhone)

router.use((req, res)=> {
    return res.send({
        success: false,
        message: 'Route not found'
    })
})

export default router
