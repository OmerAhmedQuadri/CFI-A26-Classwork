import express from 'express'
import { verifyEmail } from '../controllers/auth.controllers.js'
const router = express.Router()

router.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'user router is working just fine'
    })
})

router.get('/verify/email/:token', verifyEmail)
// router.post('/verify/phone/:token', verifyPhone)

router.use((req, res)=> {
    return res.send({
        success: false,
        message: 'Route not found'
    })
})

export default router
