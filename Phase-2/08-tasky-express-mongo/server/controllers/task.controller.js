import Task from '../models/Task.js'

const createTask = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({
                success: false,
                message: 'Body is missing',
            })
        }
        const { task, deadline, priority } = req.body

        if (!task || !deadline) {
            return res.status(400).send({
                success: false,
                message: 'Incomplete or invalid data',
            })
        }

        const existingTask = await Task.findOne({ task: task })

        if (existingTask) return res.send({
            success: false,
            message: 'Task already exists!',
            data: existingTask
        })

        const newTask = Task({ task, deadline, priority })
        await newTask.save()

        res.status(201).send({
            success: true,
            message: 'Task created Successfully',
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

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()

        res.send({
            success: true,
            message: 'Tasks fetched Successfully',
            data: tasks
        })
    } catch (error) {
        
    }
}

export { createTask, getAllTasks}