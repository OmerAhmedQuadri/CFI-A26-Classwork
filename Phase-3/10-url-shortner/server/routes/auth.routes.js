import express from 'express'
import { register, validateUserRegistration, resendRegisterOtp, login, logout } from '../controllers/auth.controllers.js'
import { registerMiddleware, loginMiddleware, authMiddleware } from '../middlewares/auth.middlewares.js'

const router = express.Router()

router.post('/register', registerMiddleware, register)
router.post('/register/verify-otp', validateUserRegistration)
router.post('/register/resend-otp', resendRegisterOtp)

router.post('/login', loginMiddleware, login)
router.post('/logout', authMiddleware, logout)

router.use(authMiddleware)
router.get('/me', (req, res) => {
    const user = req.user
    return res.status(200).send({
        success: true,
        message: "User fetched successfully",
        data: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
        },
    })
})

export default router