import express from 'express'
import { createTask, deleteTaskById, getAllTasks, getTaskById, getTaskByPriority, updateTask } from '../controllers/task.controller.js'

const taskRouter = express.Router()

taskRouter.get('/', getAllTasks)
taskRouter.get('/:id', getTaskById)
taskRouter.get('/priority/:priority', getTaskByPriority)

taskRouter.post('/create', createTask)

taskRouter.put('/update', updateTask)

taskRouter.delete('/delete/:id', deleteTaskById)

taskRouter.use((req, res) => {
    res.status(404).send({
        status: false,
        message: 'Task route not found'
    })
})

export default taskRouter