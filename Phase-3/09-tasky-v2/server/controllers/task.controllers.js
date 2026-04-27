import User from '../models/User.js'
import { getUserTasksById } from '../services/task.service.js'


export const createTask = async (req, res) => {
    try {
        const user = req.user
        const userTasks = await getUserTasksById(user._id)

        if (!user || !userTasks) {
            return res.send({
                success: false,
                message: "User not found"
            })
        }
        
        const newTask = req.newTask
        userTasks.tasks.push(newTask)
        await userTasks.save()

        res.send({
            success: true,
            message: 'Task created successfully',
            data: newTask
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

export const getAllTasks = async (req, res) => {
    try {
        const user = req.user
        const userTasks = await getUserTasksById(user._id)

        if (!user || !userTasks) {
            return res.send({
                success: false,
                message: "User not found"
            })
        }

        res.send({
            success: true,
            message: "Tasks fetch successfully",
            data: userTasks.tasks || []
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
export const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId

        const user = req.user

        if (!user) {
            return res.send({
                success: false,
                message: "User not found"
            })
        }

        const task = user.tasks.find((task) => task._id == taskId)
        if(!task) {
            return res.send({
                success: false,
                message: 'Task not found'
            })
        }

        res.send({
            success: true,
            message: "Task fetch successfully",
            data: task
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


export const updatestatus = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const status = parseInt(req.params.status)
        // console.log(req.params);
        console.log(status);

        if(!(status == 0 || status == 1)){
            return res.send({
                success: false,
                message: "Invalid task status"
            })
        }

        const user = req.user

        if (!user) {
            return res.send({
                success: false,
                message: "User not found"
            })
        }

        const taskIndex = user.tasks.findIndex((task) => task._id == taskId)

        if(taskIndex == -1) {
            return res.send({
                success: false,
                message: 'Task not found'
            })
        }

        user.tasks[taskIndex].isComplete = !!status
        await user.save()

        res.send({
            success: true,
            message: "Task status updated successfully",
            data: user.tasks[taskIndex]
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
export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId

        const user = req.user
        const userTasks = await getUserTasksById(user._id)

        if (!user) {
            return res.send({
                success: false,
                message: "User not found"
            })
        }

        const taskIndex = userTasks.tasks.findIndex((task) => task._id == taskId)

        if(taskIndex == -1) {
            return res.send({
                success: false,
                message: 'Task not found'
            })
        }
        const task = userTasks.tasks.splice(taskIndex, 1)
        await userTasks.save()

        res.send({
            success: true,
            message: "Task deleted successfully",
            data: task
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