import express from 'express'
import { getAllTasks } from '../controllers/task.controllers.js'


const router = express.Router()


router.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'user router is working just fine'
    })
})


router.get('/:userId', getAllTasks)
// router.get('/:id', getTaskById)

// router.post('/create', createTask)
// router.put('/update', updateTask)
// router.delete('/delete', deleteTask)


router.use((req, res)=> {
    return res.send({
        success: false,
        message: 'Route not found'
    })
})


export default router

/*
    GET:
        - get tasks by id / priority / deadline / all
    POST:
        - create a new task

    PUT:
        - update task

    DELETE:
        - delete task
        
*/



/*
    GET:

    POST:
        - creat a new task request for other user

    PUT:
        - verify email
        - verify phone
        - update user details

    DELETE:
        - delete user
*/



