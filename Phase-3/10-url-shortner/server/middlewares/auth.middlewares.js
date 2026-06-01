import { validatePassword } from "../services/auth.services.js"
import { findUserByEmail, findUserByEmailAndDelete, findUserById } from "../services/user.services.js"
import { validateJWTToken } from "../utils/jwt.utils.js"
import { BadRequestError, UnauthorizedError } from "../utils/AppError.js"

const registerValidator = async ({ fullname, email, password }) => {
    const errors = {}
    if (!fullname) {
        errors.fullname = 'Fullname is required'
    }
    if (!email) {
        errors.email = 'Email is required'
    }
    if (!password) {
        errors.password = 'Password is required'
    }
    return errors
}



export const registerMiddleware = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body || {}
        console.log(req.body);
        const errors = await registerValidator({ fullname, email, password })
        if (Object.keys(errors).length > 0) {
            console.log(errors);
            throw new BadRequestError('Validation failed: ' + JSON.stringify(errors))
        }

        const existingUser = await findUserByEmail(email)

        if (existingUser && existingUser.status != 'pending') {
            throw new BadRequestError('Email is already registered')
        }
        if (existingUser && existingUser.status == 'pending') {
            await findUserByEmailAndDelete(email)
        }


        req.user = {
            fullname,
            email,
            password
        }
        next()
    } catch (error) {
        next(error)
    }
}


export const loginMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.body || {}
        if (!email) {
            throw new BadRequestError('Email is required')
        }
        if (!password) {
            throw new BadRequestError('Password is required')
        }

        const user = await findUserByEmail(email)
        if (!user) {
            throw new UnauthorizedError('Invalid credentials')
        }
        if (user.status == 'pending') {
            throw new UnauthorizedError('User registration is not verified. Please verify your email.')
        }

        const isValid = await validatePassword(user._id, password)
        if (!isValid) {
            throw new UnauthorizedError('Invalid credentials')
        }
        if (user.status == 'inactive') {
            throw new UnauthorizedError('User is inactive. Please contact support.')
        }

        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}


export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            throw new UnauthorizedError('Unauthorized')
        }
        const id = await validateJWTToken(token)

        if (!id) {
            throw new UnauthorizedError('Unauthorized')
        }

        req.user = await findUserById(id)
        next()
    } catch (error) {
        next(error)
    }
}