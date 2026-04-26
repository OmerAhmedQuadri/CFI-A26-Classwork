import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import taskRouter from './routes/task.routes.js'
import authRouter from './routes/auth.routes.js'
import adminRouter from './routes/admin.routes.js'
import './utils/dbConnect.js'
import './seeds/admin.seed.js'
import cors from 'cors'

dotenv.config()
const PORT = process.env.PORT

const server = express()
server.use(cors())

server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/users', userRouter)
server.use('/api/tasks', taskRouter)
server.use('/api/admin', adminRouter)

server.use((req, res)=> {
    return res.send({
        success: false,
        message: 'Route not found'
    })
})

server.listen(PORT, () => {
    console.log('Server @'+PORT);
})

// email - resend, sms - twilio, jwt