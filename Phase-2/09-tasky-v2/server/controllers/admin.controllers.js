import User from "../models/User.js";
import { generateJWTToken } from "../utils/jwt.js";

export const adminLogin = async (req, res) => {
    try {
        const admin = req.admin

        const payload = {
            id: admin._id,
            email: admin.email,
            role: 'admin'
        }
        const token = await generateJWTToken(payload)

        res.send({
            success: true,
            message: 'admin login successfull',
            data: { admin, token: token},
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error
        })
    }
}

export const updateUserStatus = async (req, res) => {
    try {
        if (!req.body) return res.send({ success: false, message: 'Invalid body' })
        const userId = req.body.userId
        const status = req.body.status
        if (!userId) {
            return res.send({
                success: false,
                message: 'Valid userId is required',
            })
        }
        if (!status || !['active', 'disabled', 'banned'].includes(status)) {
            return res.send({
                success: false,
                message: 'Valid status is required',
            })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.send({
                success: false,
                message: 'User not found'
            })
        }
        user.status = status
        user.save()
        res.send({
            success: true,
            message: 'User status updated successfully',
            data: user
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (!users || users.length == 0) {
            return res.send({
                success: false,
                message: 'No users were found!',
                data: []
            })
        }

        res.send({
            success: true,
            message: 'Users fetched successfully',
            data: users
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error
        })
    }
}
export const assignTask = async (req, res) => {
    try {
        const { user, task } = req

        user.tasks.push(task)
        await user.save()

        res.send({
            success: true,
            message: 'Task assigned successfully',
            data: user.tasks
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error
        })
    }
}
export const createUser = async (req, res) => {
    try {
        const { userData } = req
        userData.verified = {
            email: true,
            phone: true
        }
        userData.tokens = {
            email: 'null',
            phone: 'null'
        }
        const user = await User.create(userData)

        res.send({
            success: true,
            message: 'User created successfully',
            data: user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error
        })
    }
}

