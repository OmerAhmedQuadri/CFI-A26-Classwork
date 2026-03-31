const deadlineValidator = (input) => {
    try {
        const deadline = new Date(input)
        if (isNaN(deadline.getTime())) {
            return {
                success: false,
                message: 'Invalid deadline'
            }
        }

        const now = new Date()
        if (now.getTime() > deadline.getTime()) {
            return {
                success: false,
                message: 'Deadline cannot be in past'
            }
        }

        const minTime = new Date(now.getTime() + 1000 * 60 * 30)
        if (minTime.getTime() > deadline.getTime()) {
            return {
                success: false,
                message: 'Deadline cannot be in immediate 30 min'
            }
        }

        const maxTime = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30)
        if (maxTime.getTime() < deadline.getTime()) {
            return {
                success: false,
                message: 'Deadline cannot be post 30 days'
            }
        }
        return {
            success: true,
            message: 'Valid deadline'
        }
    } catch (error) {
        console.log(error);
    }
}

export const createTaskMiddleware = async (req, res, next) => {
    try {
        const { taskname, deadline, priority } = req.body
        if (!taskname || !deadline || !priority || !['high', 'medium', 'low'].includes(priority)) {
            return res.send({
                success: false,
                message: 'Incomplete or invalid data'
            })
        }
        const isValidDeadline = deadlineValidator(deadline)
        if (!isValidDeadline.success) {
            return res.send({
                success: false,
                message: isValidDeadline.message
            })
        }

        req.newTask = { taskname, deadline, priority }

        next()

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error from middleware',
            error: error
        })
    }
}