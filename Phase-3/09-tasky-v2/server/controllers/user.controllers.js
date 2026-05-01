import User from '../models/User.js'
import { hashPassword, comparePassword } from '../utils/bcrypt.js'
import generateToken from '../utils/token.js'
import { sendEmail } from '../services/email.service.js'
import { generateJWTToken } from '../utils/jwt.js'

export const registerUser = async (req, res) => {
    try {
        const newUser = req.user

        // hash user password
        newUser.password = await hashPassword(newUser.password)

        // generete verification tokens for email and phone
        const emailToken = generateToken()
        const phoneToken = generateToken()

        newUser.tokens = {
            email: emailToken,
            phone: phoneToken
        }

        // save user
        const user = await User.create(newUser)

        // send verification / magic link 
        let verificationLink
        if (process.env.ENV == 'development') {
            console.log('development');
            verificationLink = `http://localhost:5200/client/verify/?user=${user._id}&verify=email&token=${user.tokens.email}`
        } else {
            console.log('production');
            verificationLink = `http://localhost:5200/verify/?user=${user._id}&verify=email&token=${user.tokens.email}`
        }
        const emailData = {
            to: user.email,
            subject: 'Tasky verification',
            html: `<h3>Hello ${user.fullname}</h3>
            <p>Click <a href="${verificationLink}" target="_blank">here</a> to verify your email.</p>`

            // <p>Click <a href="http://localhost:3000/api/auth/verify/email/${user._id}/${user.tokens.email}" target="_blank">here</a> to verify your email.</p>
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

        const payload = {
            id: user._id,
            email: user.email,
            role: 'user'
        }

        const token = await generateJWTToken(payload)
        // user.jwtToken = token

        res.send({
            success: true,
            message: 'user login successfull',
            data: { user, token },
            // token: token
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

export const getUserProfile = async (req, res) => {
    try {
        const user = req.user

        res.send({
            success: true,
            message: 'user profile fetched successfully',
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

export const updateUserProfile = async (req, res) => {
    try {
        const user = req.user

        const { phone, fullname } = req.updatedUser
        // console.log(updatedUser);
        // console.log(user);
        console.log(phone, fullname);

        phone && (user.phone = phone)
        fullname && (user.fullname = fullname)

        await user.save()
        console.log(user);

        res.send({
            success: true,
            message: 'user profile updated successfully',
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