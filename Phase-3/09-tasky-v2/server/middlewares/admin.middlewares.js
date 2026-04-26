import Admin from '../models/Admin.js'
import User from '../models/User.js'
import { comparePassword } from '../utils/bcrypt.js'

export const adminLoginMiddleware = async (req, res, next) => {
    try {

        const { email, password } = req.body
        if (!email || !password) {
            return res.send({
                success: false,
                message: 'valid email and password is required to login'
            })
        }

        const admin = await Admin.findOne({ email: email })
        // console.log(user);
        if (!admin) {
            return res.send({
                success: false,
                message: 'Admin not found'
            })
        }
        const validatePassword = await comparePassword(password, admin.password)
        if (!validatePassword) {
            return res.send({
                success: false,
                message: 'Invalid password'
            })
        }
        if (!admin.verified.email) {
            return res.send({
                success: false,
                message: 'Please verify your email before login',
            })
        }
        req.admin = admin

        next()
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error from admin middleware',
            error: error
        })
    }
}

export const assignTaskMiddleware = async (req, res, next) => {
    try {
        const { userId } = req.body
        const user = await User.findById(userId)

        if (!user || user.status != 'active') {
            return res.send({
                success: false,
                message: "User is inactive or not found"
            })
        }

        const { taskname, deadline, priority } = req.body
        if (!taskname || !deadline || !priority || !['high', 'medium', 'low'].includes(priority)) {
            return res.send({
                success: false,
                message: 'Incomplete or invalid task data'
            })
        }

        req.user = user
        req.task = { taskname, deadline, priority }
        next()

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error from admin middleware',
            error: error
        })
    }
}

