import User from '../models/User.js'
import { comparePassword } from '../utils/bcrypt.js'

export const validateUserRegistrationData = (userData) => {
    const errors = []
    if (!userData.email) {
        errors.push({
            field: 'email',
            message: 'Valid email address is required'
        })
    }
    if (!userData.phone) {
        errors.push({
            field: 'phone',
            message: 'Valid phone number is required'
        })
    }
    if (!userData.fullname) {
        errors.push({
            field: 'fullname',
            message: 'Valid fullname is required'
        })
    }
    if (!userData.password || userData.password.length < 3) {
        errors.push({
            field: 'password',
            message: 'Valid password is required with minimum 3 characters'
        })
    }
    if (!userData.role || !["user", "admin"].includes(userData.role)) {
        errors.push({
            field: 'role',
            message: 'Valid user role is required'
        })
    }
    return errors
}

export const registerMiddleware = async (req, res, next) => {
    try {
        const userData = req.body
        const errors = validateUserRegistrationData(userData)
        if (errors.length != 0) {
            return res.send({
                success: false,
                message: 'Invalid user registraion data',
                data: errors
            })
        }

        const existinguser = await User.findOne({ email: userData.email })
        // console.log(existinguser);

        if (existinguser) {
            return res.send({
                success: false,
                message: 'User with email already exists',
            })
        }

        req.userData = {
            email: userData.email,
            phone: userData.phone,
            fullname: userData.fullname,
            password: userData.password,
            role: userData.role,
        }

        next()

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error from middleware',
            error: error
        })
    }
}
export const loginMiddleware = async (req, res, next) => {
    try {

        const { email, password } = req.body
        if (!email || !password) {
            return res.send({
                success: false,
                message: 'valid email and password is required to login'
            })
        }

        const user = await User.findOne({ email: email })
        // console.log(user);
        if (!user) {
            return res.send({
                success: false,
                message: 'User not found'
            })
        }

        const validatePassword = await comparePassword(password, user.password)
        if (!validatePassword) {
            return res.send({
                success: false,
                message: 'Invalid password'
            })
        }

        if(!user.verified.email){
            return res.send({
                success: false,
                message: 'Please verify your email before login',
            })
        }
        if(!user.verified.phone){
            return res.send({
                success: false,
                message: 'Please verify your phone before login',
            })
        }
        req.user = user

        next()

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error from middleware',
            error: error
        })
    }
}

