import express from 'express'
import './dbConnect.js'
import { createTask, getAllTasks } from './controllers/task.controller.js'

const PORT  = 3000
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Server is running!'
    })
})

app.get('/api/tasks/', getAllTasks)
app.post('/api/tasks/create', createTask)

app.use((req, res) => {
    res.status(404).send({
        status: false,
        message: 'Route not found'
    })
})

app.listen(PORT, ()=>{
    console.log('Server is running...');
})



/*
Routes:
    GET:
        /api/tasks - get all tasks
        /api/tasks/id - get task by id

    POST:
        /api/tasks/create - create a new task

    PUT: 
        /api/tasks/update - update task by id

    DELETE: 
        /api/tasks/delete/id - delete task by id


*/