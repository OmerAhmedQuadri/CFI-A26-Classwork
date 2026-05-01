import User from '../models/User.js'
import { sendEmail } from '../services/email.service.js'
import { generateOtp } from '../services/otp.service.js'

export const verifyEmail = async (req, res) => {
    try {
        // const email = req.params.email
        const userId = req.params.userId
        const emailToken = req.params.token
        const user = await User.findById(userId)
        
        if (!user || user.tokens.email != emailToken) {
            return res.send({
                success: false,
                message: 'Invalid user or verification token',
            })
        }
        
        if (user.verified.email) {
            return res.status(409).send({
                success: false,
                message: 'Email already verified',
            })
            // return res.send(`<h1>Email already verified</h1>`)
        }
        
        user.verified.email = true
        await user.save()

        res.send({
            success: true,
            message: 'Email verified successfully',
            data: user
        })
    
        // res.send(`<h1>Email verified successfully</h1>`)

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error
        })
    }
}

export const verifyPhone = async (req, res) => {
    try {
        const phoneToken = req.params.token
        const userId = req.params.userId
        const user = await User.findById(userId)

        if (!user || user.tokens.phone != phoneToken) {
            return res.send({
                success: false,
                message: 'Invalid user or verification token',
            })
        }
        
        if (user.verified.phone) {
            return res.send({
                success: false,
                message: 'Phone already verified',
            })
        }

        user.verified.phone = true
        await user.save()

        res.send({
            success: true,
            message: 'Phone verified successfully',
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

export const requestEmailUpdate = async (req, res) => {
    try {
        req.body = req.body || {}
        const newEmail = req.body.email
        if (!newEmail) {
            return res.send({
                success: false,
                message: 'Valid email is required',
            })
        }
        const user = req.user
        const otp = await generateOtp()


        user.requestedEmail.otp = otp
        user.requestedEmail.email = newEmail
        user.requestedEmail.deadline = (new Date(Date.now() + 1000 * 60)).toISOString()
        await user.save()

        const emailData = {
            to: newEmail,
            subject: 'Tasky | Email update request',
            html: `<h3>Hello ${user.fullname}</h3>
            <p>Here is you OTP: <b>${otp}</b> to update your email</p>`
        }
        await sendEmail(emailData)
        
        res.send({
            success: true,
            message: 'Email update request sent successfully',
            data: newEmail
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


export const updateEmail = async (req, res) => {
    try {
        req.body = req.body || {}
        const { otp, email } = req.body
        const user = req.user

        if (!otp || !email) {
            return res.send({
                success: false,
                message: 'Valid otp and email is required',
            })
        }

        if ((user.requestedEmail.otp != otp) || (user.requestedEmail.email != email)) {
            return res.send({
                success: false,
                message: 'Invalid email or otp',
            })
        }

        if (new Date(user.requestedEmail.deadline).getTime() < Date.now()) {
            return res.send({
                success: false,
                message: 'OTP has expired',
            })
        }

        user.email = email
        user.requestedEmail.otp = null
        user.requestedEmail.email = null
        user.requestedEmail.deadline = null
        await user.save()

        res.send({
            success: true,
            message: 'Email updated successfully',
            data: email
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