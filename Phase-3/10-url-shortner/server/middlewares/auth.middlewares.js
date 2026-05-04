import { findUserByEmail, findUserByEmailAndDelete } from "../services/auth.services.js"
import { comparePassword } from "../utils/bcrypt.utils.js"


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
        const errors = await registerValidator({ fullname, email, password })
        if (Object.keys(errors).length > 0) {

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
        if (user.status == 'inactive') {
            return res.status(400).send({
                success: false,
                message: 'User is inactive'
            })
        }

        const validatePassword = await comparePassword(password, user.password)
        if (!validatePassword) {
            return res.status(400).send({
                success: false,
                message: 'Invalid credentials'
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