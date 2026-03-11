import express from 'express'
import './dbConnect.js'
import taskRouter from './routes/task.routes.js'

const PORT  = 3000
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Server is running!'
    })
})

app.use('/api/tasks/', taskRouter)

app.use((req, res) => {
    res.status(404).send({
        status: false,
        message: 'Route not found'
    })
})

app.listen(PORT, ()=>{
    console.log('Server is running...');
})





// app.get('/api/tasks/', getAllTasks)
// app.get('/api/tasks/:id', getTaskById)
// app.get('/api/tasks/priority/:priority', getTaskByPriority)
// app.post('/api/tasks/create', createTask)
// app.put('/api/tasks/update', updateTask)
// app.delete('/api/tasks/delete/:id', deleteTaskById)
/*
Routes:
    GET:
        /api/tasks - get all tasks
        /api/tasks/id - get task by id
        /api/tasks/priority/:priority - get tasks by priority

    POST:
        /api/tasks/create - create a new task

    PUT: 
        /api/tasks/update - update task by id

    DELETE: 
        /api/tasks/delete/id - delete task by id


*/