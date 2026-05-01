import User from '../models/User.js'
import Admin from '../models/Admin.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { getUserById } from '../services/user.service.js'
dotenv.config()

export const authMiddleware = async (req, res, next) => {
    try {
        const jwtToken = req.headers['auth-token']
        // console.log(jwtToken);
        const decoded = jwt.verify(jwtToken, process.env.secret)
        // console.log(decoded)
        const userId = decoded.data.id
        const user = await getUserById(userId)
        // console.log(user);

        if(!user || user.status != 'active') {
            return res.send({
                success: false,
                message: 'User inactive or not found'
            })
        }
        if(user.role != decoded.data.role) {
            return res.send({
                success: false,
                message: 'Auth failure'
            })
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: error.message,
            data: error
        })
    }
}

export const adminAuthMiddleware = async (req, res, next) => {
    try {
        const jwtToken = req.headers['auth-token']
        // console.log(jwtToken);
        const decoded = jwt.verify(jwtToken, process.env.secret)
        console.log(decoded)
        const userId = decoded.data.id
        const admin = await Admin.findById(userId)

        if(admin.role != decoded.data.role) {
            return res.send({
                success: false,
                message: 'Auth failure'
            })
        }
        req.admin = admin
        next()
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: error.message,
            data: error
        })
    }
}