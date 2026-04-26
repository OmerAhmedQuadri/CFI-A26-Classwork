import express from 'express'
import { adminLoginMiddleware, assignTaskMiddleware } from '../middlewares/admin.middlewares.js'
import { adminLogin, assignTask, createUser, getAllUsers, updateUserStatus } from '../controllers/admin.controllers.js'
import { registerMiddleware } from '../middlewares/user.middlewares.js'
import { adminAuthMiddleware } from '../middlewares/auth.middlewares.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'admin router is working just fine'
    })
})

router.post('/login', adminLoginMiddleware, adminLogin)

router.use(adminAuthMiddleware)
router.get('/getAllUsers', getAllUsers)
// router.get('/getUser/:id', getUserById)  // TODO

router.post('/create-user', registerMiddleware, createUser)
router.post('/assign-task', assignTaskMiddleware, assignTask)
router.put('/update/user-status', updateUserStatus)
// router.delete('/delete-user/:userId', deleteUser)  // TODO

router.use((req, res)=> {
    return res.send({
        success: false,
        message: 'Admin route not found'
    })
})


export default router

/*
    GET:
        - get admin details
        - get user details
        - get all users
        
    POST:
        - create user
        - assign tasks

    PUT:
        - update user details
        - ban / disable users

    DELETE:
        - delete user

*/