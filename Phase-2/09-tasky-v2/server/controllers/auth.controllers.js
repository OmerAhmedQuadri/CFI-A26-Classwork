import User from '../models/User.js'

export const verifyEmail = async (req, res) => {
    try {
        const emailToken = req.params.token
        const user = await User.findOne({ "tokens.email": emailToken })
        if (!user) {
            return res.send({
                success: false,
                message: 'Invalid verification token',
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