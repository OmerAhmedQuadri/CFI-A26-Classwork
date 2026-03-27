import User from '../models/User.js'
import { hashPassword, comparePassword } from '../utils/bcrypt.js'
import token from '../utils/token.js'
import { sendEmail } from '../services/email.service.js'

export const registerUser = async (req, res) => {
    try {
        const newUser = req.user

        // hash user password
        newUser.password = await hashPassword(newUser.password)

        // generete verification tokens for email and phone
        const emailToken = token()
        const phoneToken = token()
        
        newUser.tokens = {
            email: emailToken,
            phone: phoneToken
        }

        // save user
        const user = await User.create(newUser)

        // send verification / magic link 
        const emailData = {
            to: newUser.email,
            subject: 'Tasky verification',
            html: `<h3>Hello ${user.fullname}</h3>
            <p>Click <a href="http://localhost:3000/api/auth/verify/email/${user._id}/${user.tokens.email}" target="_blank">here</a> to verify your email.</p>`
            // html: `http://localhost:3000/api/auth/verify/email/${user._id}/${user.tokens.email}`
        }
        await sendEmail(emailData)

        // send success response
        res.send({
            success: true,
            message: 'user created successfully',
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

export const loginUser = async (req, res) => {
    try {
        const user = req.user

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

        res.send({
            success: true,
            message: 'user login successfull',
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


