import express from 'express'
import { register, validateUserRegistration, resendRegisterOtp, login } from '../controllers/auth.controllers.js'
import { registerMiddleware, loginMiddleware } from '../middlewares/auth.middlewares.js'

const router = express.Router()

router.post('/register', registerMiddleware, register)
router.post('/register/verify-otp', validateUserRegistration)
router.post('/register/resend-otp', resendRegisterOtp)

router.post('/login', loginMiddleware, login)


export default router