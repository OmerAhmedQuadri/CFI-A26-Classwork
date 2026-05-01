import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import taskRouter from './routes/task.routes.js'
import authRouter from './routes/auth.routes.js'
import adminRouter from './routes/admin.routes.js'
import './utils/dbConnect.js'
import './seeds/admin.seed.js'
import cors from 'cors'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// console.log(__dirname);
// console.log(__filename);

dotenv.config()
const PORT = process.env.PORT

const server = express()
server.use(cors())

server.use(express.json())


server.use(express.static(path.join(__dirname, '../client')))


server.use('/api/auth', authRouter)
server.use('/api/users', userRouter)
server.use('/api/tasks', taskRouter)
server.use('/api/admin', adminRouter)



// server.use((req, res)=> {
//     return res.send({
//         success: false,
//         message: 'Route not found'
//     })
// })

// api fallback
server.use('/api', (req, res)=> {
    return res.send({
        success: false,
        message: 'Route not found'
    })
})


// frontend fallback
server.use((req, res)=> {
    res.status(200).sendFile(
        // path.join(__dirname, 'photo.png')
        path.join(__dirname, '../client/')
    )
})

server.listen(PORT, () => {
    console.log('Server @'+PORT);
})

// email - resend, sms - twilio, jwt