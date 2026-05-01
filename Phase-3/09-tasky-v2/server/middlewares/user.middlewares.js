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
    const allowedRoles = ['user']
    if (!userData.role || !allowedRoles.includes(userData.role)) {
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
        userData.role = 'user'
        const errors = validateUserRegistrationData(userData)
        if (errors.length != 0) {
            return res.status(400).send({
                success: false,
                message: 'Invalid user registraion data',
                data: errors
            })
        }

        const existinguser = await User.findOne({ email: userData.email })
        // console.log(existinguser);

        if (existinguser) {
            return res.status(409).send({
                success: false,
                message: 'User with email already exists',
            })
        }

        req.user = {
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
        // console.log(req.body);
        const { email, password = null } = req.body
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'valid email and password is required to login'
            })
        }

        // console.log(email, password);
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials'
            })
        }

        const validatePassword = await comparePassword(password, user.password)

        if (!validatePassword) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials'
            })
        }

        if (!user.verified.email) {
            return res.status(401).send({
                success: false,
                message: 'Please verify your email before login',
            })
        }
        if (!user.verified.phone) {
            return res.status(401).send({
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

export const updateProfileMiddleware = async (req, res, next) => {
    try {
        req.body = req.body || {}

        const user = req.user
        const { phone, fullname } = req.body

        if(!phone && !fullname) {
            return res.status(400).send({
                success: false,
                message: 'valid phone and fullname is required to update profile'
            })
        }

        req.updatedUser = {
            phone,
            fullname
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