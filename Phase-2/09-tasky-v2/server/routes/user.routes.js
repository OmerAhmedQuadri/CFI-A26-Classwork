import express from 'express'
import { loginUser, registerUser } from '../controllers/user.controllers.js'
import { loginMiddleware, registerMiddleware } from '../middlewares/user.middlewares.js'

const router = express.Router()


router.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'user router is working just fine'
    })
})

router.post('/register', registerMiddleware, registerUser)
router.post('/login', loginMiddleware, loginUser)


router.use((req, res)=> {
    return res.send({
        success: false,
        message: 'Route not found'
    })
})


export default router

/*
    GET:
        - get user details
    POST:
        - register
        - login

    PUT:
        - verify email
        - verify phone
        - update user details

    DELETE:
        - delete user
*/