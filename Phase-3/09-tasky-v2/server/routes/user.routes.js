import express from 'express'
import { getUserProfile, loginUser, registerUser, updateUserProfile } from '../controllers/user.controllers.js'
import { loginMiddleware, registerMiddleware, updateProfileMiddleware } from '../middlewares/user.middlewares.js'
import { authMiddleware } from '../middlewares/auth.middlewares.js'

const router = express.Router()


router.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'user router is working just fine'
    })
})
router.post('/register', registerMiddleware, registerUser)
router.post('/login', loginMiddleware, loginUser)

router.use(authMiddleware) // all routes after this line are protected routes
router.get('/profile', getUserProfile)
router.put('/profile', updateProfileMiddleware, updateUserProfile)


router.use((req, res)=> {
    return res.status(404).send({
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