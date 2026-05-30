import { validatePassword } from "../services/auth.services.js"
import { findUserByEmail, findUserByEmailAndDelete, findUserById } from "../services/user.services.js"
import { validateJWTToken } from "../utils/jwt.utils.js"

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
            return res.status(400).json({
                success: false,
                message: 'Bad Request',
                errors
            })
        }

        const existingUser = await findUserByEmail(email)

        if (existingUser && existingUser.status != 'pending') {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }
        if(existingUser && existingUser.status == 'pending'){
            await findUserByEmailAndDelete(email)
        }
        

        req.user = {
            fullname,
            email,
            password
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}


export const loginMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.body || {}
        if (!email) {
            return res.status(400).send({
                success: false,
                message: 'Email is required'
            })
        }
        if (!password) {
            return res.status(400).send({
                success: false,
                message: 'Password is required'
            })
        }

        const user = await findUserByEmail(email)
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'User not found'
            })
        }
        if (user.status == 'pending') {
            return res.status(400).send({
                success: false,
                message: 'User is not registered or verified yet'
            })
        }

        const isValid = await validatePassword(user._id, password)
        if (!isValid) {
            return res.status(400).send({
                success: false,
                message: 'Invalid credentials'
            })
        }
        if (user.status == 'inactive') {
            return res.status(400).send({
                success: false,
                message: 'User is inactive'
            })
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}


export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized'
            })
        }
        const id = await validateJWTToken(token)

        if (!id) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized'
            })
        }
        
        req.user = await findUserById(id)
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}