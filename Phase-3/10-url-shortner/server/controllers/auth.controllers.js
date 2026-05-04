import { createUser, findUserByEmail } from '../services/auth.services.js'
import { generateOtp } from '../utils/otp.utils.js'

export const register = async (req, res) => {
    const { fullname, email, password } = req.user
    try {
        const user = await createUser({ fullname, email, password })

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

export const validateUserRegistration = async (req, res) => {
    const { email, otp } = req.body || {}
    if (!email) {
        return res.status(400).send({
            success: false,
            message: 'Email is required'
        })
    }
    if (!otp) {
        return res.status(400).send({
            success: false,
            message: 'OTP is required'
        })
    }
    try {
        const user = await findUserByEmail(email)
        if (user && user.status == 'pending') {
            if (user.authTokens.userRegisteration.otp == otp) {
                const expiry = new Date(user.authTokens.userRegisteration.expires)
                if (expiry.getTime() < Date.now()) {
                    return res.status(400).send({
                        success: false,
                        message: 'OTP expired'
                    })
                }
                user.status = 'active'
                user.authTokens.userRegisteration.otp = 'null'
                user.authTokens.userRegisteration.expires = 'null'
                await user.save()
                return res.status(200).send({
                    success: true,
                    message: 'User verified successfully, you can login now'
                })
            } else {
                return res.status(400).send({
                    success: false,
                    message: 'Invalid OTP'
                })
            }
        } else if (user) {
            return res.status(400).send({
                success: false,
                message: 'User already verified'
            })
        } else {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}


export const resendRegisterOtp = async (req, res) => {
    const { email } = req.body || {}
    if (!email) {
        return res.status(400).send({
            success: false,
            message: 'Email is required'
        })
    }
    try {
        const user = await findUserByEmail(email)
        if (user && user.status == 'pending') {
            user.authTokens.userRegisteration.otp = generateOtp()
            user.authTokens.userRegisteration.expires = new Date(Date.now() + 1 * 60 * 1000).toISOString()
            await user.save()
            return res.status(200).send({
                success: true,
                message: 'OTP resent successfully'
            })
        } else if (user) {
            return res.status(400).send({
                success: false,
                message: 'User already verified'
            })
        } else {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}



export const login = async (req, res) => {

    const user = req.user
    const token = 'hello'

    return res.status(200).send({
        success: true,
        message: 'User logged in successfully',
        data: {
            user,
            token
        }
    })
}