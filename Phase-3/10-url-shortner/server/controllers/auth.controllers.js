import { verifyRegisterOtp } from '../services/auth.services.js'
import { createUser, findUserByEmail } from '../services/user.services.js'
import { sendOtp } from '../services/email.services.js'
import { generateOtp } from '../utils/otp.utils.js'
import { generateJWTToken } from '../utils/jwt.utils.js'
import { cookieConfig } from '../config/cookie.config.js'
import { BadRequestError, ConflictError } from '../utils/AppError.js'
import { asyncWrapper } from '../utils/asyncHandler.js'

export const register = asyncWrapper(async (req, res, next) => {
    const { fullname, email, password } = req.user
    const user = await createUser({ fullname, email, password })
    return res.status(201).json({
        success: true,
        message: 'User registered successfully',
    })
})

export const validateUserRegistration = asyncWrapper(async (req, res, next) => {
    const { email, otp } = req.body || {}
    if (!email) {
        throw new BadRequestError('Email is required')
    }
    if (!otp) {
        throw new BadRequestError('OTP is required')
    }

    const { success, message } = await verifyRegisterOtp(email, otp)

    if (success) {
        return res.status(200).send({
            success: true,
            message
        })
    } else {
        throw new BadRequestError(message)
    }

})


export const resendRegisterOtp = asyncWrapper(async (req, res, next) => {
    const { email } = req.body || {}
    if (!email) {
        throw new BadRequestError('Email is required')
    }
    const user = await findUserByEmail(email)
    if (user && user.status == 'pending') {
        user.authTokens.userRegisteration.otp = generateOtp()
        user.authTokens.userRegisteration.expires = new Date(Date.now() + 1 * 60 * 1000).toISOString()
        await user.save()

        await sendOtp(email, user.authTokens.userRegisteration.otp)
        return res.status(200).send({
            success: true,
            message: 'OTP resent successfully'
        })
    } else if (user) {
        throw new ConflictError('User is already registered')
    } else {
        throw new BadRequestError('User not found')
    }
})

export const login = asyncWrapper (async (req, res, next) => {
    const user = req.user
    const token = await generateJWTToken(user._id)

    res.cookie('token', token, cookieConfig)
    return res.status(200).send({
        success: true,
        message: 'User logged in successfully',
        data: user
    })
})


export const logout = asyncWrapper (async (req, res, next) => {
    res.clearCookie('token')
    return res.status(200).send({
        success: true,
        message: 'User logged out successfully',
    })
})