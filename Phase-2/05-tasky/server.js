import express from 'express'
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from './controllers/task.controller.js'

const PORT = 3000
const app = express()


app.get('/', (req, res) => {
    res.send('Server is running')
})

app.use(express.json())

app.get('/api/tasks', getAllTasks)
app.get('/api/tasks/:id', getTaskById)

app.post('/api/create', createTask)

app.put('/api/update', updateTask)

app.delete('/api/delete/:id', deleteTask)

app.use((req, res) =>{
    res.json({status: false, message: 'Route not found' })
})



app.listen(PORT, () => {
    console.log('Server is running at http://localhost:'+PORT);
})

/*
Routes:
    GET:
        get all tasks - /api/tasks
        get task by id - /api/get/:id

    POST: 
        create task - /api/create

    PUT:
        update task - /api/update

    DELETE:
        delete all tasks - /api/deleteAll
        delete task - /api/delete/:id

*/