import User from '../models/User.js'

export const verifyEmail = async (req, res) => {
    try {
        const emailToken = req.params.token
        const userId = req.params.userId
        const user = await User.findById(userId)

        if (!user || user.tokens.email != emailToken) {
            return res.send({
                success: false,
                message: 'Invalid user or verification token',
            })
        }
        
        if (user.verified.email) {
            return res.send({
                success: false,
                message: 'Email already verified',
            })
        }
        
        user.verified.email = true
        await user.save()

        res.send({
            success: true,
            message: 'email verified successfully',
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