import User from '../models/User.js'

export const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.send({
            success: true,
            message: 'user created successfully',
            data: user
        })
        
    } catch (error) {
        console.log(error);
    }
}


