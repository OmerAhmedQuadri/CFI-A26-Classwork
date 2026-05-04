import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.routes.js'
import './utils/dbConnect.js'

dotenv.config()
const PORT = process.env.PORT || 3200

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    console.log((new Date()).toLocaleTimeString(), req.method, req.url);
    next()
})

app.use('/api/auth', authRouter)

app.use((req, res) => {
    res.status(404).send({
        success: false,
        message: 'Route Not Found'
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT} ${(new Date()).toLocaleTimeString()}`)
})