import User from '../models/User.js'


export const getAllTasks = async (req, res) => {
    try {

        const id = req.params.userId
        const user = User.findById(id)

        if(!user){
            return res.send({
                success: false,
                message: "User not found"
            })
        }

        res.send({
            success: true,
            message: "Tasks fetch successfully",
            data: user.tasks || []
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