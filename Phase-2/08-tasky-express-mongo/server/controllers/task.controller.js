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
        if (!['high', 'medium', 'low'].includes(priority)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid task priority',
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
        if (!tasks || tasks.length == 0) {
            return res.status(404).send({
                success: false,
                message: 'Tasks not found',
                data: []
            })
        }

        res.send({
            success: true,
            message: 'Tasks fetched Successfully',
            data: tasks
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

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params
        if (id.length != 24) {
            return res.status(400).send({
                success: false,
                message: 'Invalid task id',
            })
        }

        const task = await Task.findById(id)
        // console.log(task);
        if (!task) {
            return res.status(400).send({
                success: false,
                message: 'Task not found',
                data: null
            })
        }

        res.send({
            success: true,
            message: 'Task fetched Successfully',
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
const getTaskByPriority = async (req, res) => {
    try {
        const { priority } = req.params
        if (!['high', 'medium', 'low'].includes(priority)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid task priority',
            })
        }

        const task = await Task.find({ priority })
        
        // console.log(task);
        if (!task) {
            return res.status(400).send({
                success: false,
                message: 'Tasks not found with priority ' + priority,
                data: []
            })
        }

        res.send({
            success: true,
            message: 'Task fetched Successfully',
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

const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id
        if (id.length != 24) {
            return res.status(400).send({
                success: false,
                message: 'Invalid task id',
            })
        }

        const task = await Task.findByIdAndDelete(id)
        // console.log(task);
        if (!task) {
            return res.status(400).send({
                success: false,
                message: 'Task not found',
                data: null
            })
        }

        res.send({
            success: true,
            message: 'Task deleted Successfully',
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

const updateTask = async (req, res) => {
    try {
        if(!req.body){
            return res.status(400).send({
                success: false,
                message: 'Body is missing',
            })        
        }

        const { id, task, deadline, priority, completed } = req.body

        if (!id || id.length != 24) {
            return res.status(400).send({
                success: false,
                message: 'Invalid task id',
            })
        }

        if(!(task || deadline || priority || (completed != undefined))){
            return res.status(400).send({
                success: false,
                message: 'Incomplete data',
            })
        }
        if (priority && !['high', 'medium', 'low'].includes(priority)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid task priority',
            })
        }

        const updatedAt = new Date().toLocaleString()
        const existingTask = await Task.findByIdAndUpdate( id, { completed, task, deadline, priority, updatedAt }, { runValidators: true, new: true })

        // ---OR---
        // const existingTask = await Task.findById(id)
        // if(task) existingTask.task = task
        // if(deadline) existingTask.deadline = deadline
        // if(priority) existingTask.priority = priority
        // await existingTask.save()

        if(!existingTask){
            return res.send({
                success: false,
                message: 'Task not found'
            })
        }

        res.send({
            success: true,
            message: 'Task updated Successfully',
            data: existingTask
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

export { createTask, getAllTasks, getTaskById, getTaskByPriority, deleteTaskById, updateTask }