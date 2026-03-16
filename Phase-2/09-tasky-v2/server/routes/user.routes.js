import express from 'express'
import { registerUser } from '../controllers/user.controllers.js'
const router = express.Router()


router.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'user router is working just fine'
    })
})

router.post('/register', registerUser)


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