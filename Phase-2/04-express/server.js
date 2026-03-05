import express from 'express'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/users/:username', (req, res) => {
    // console.log(req.params.username);
    const {username} = req.params  // username = req.params.username
    res.send({
        name: username,
        role: 'developer'
    })
})

app.use((req, res) => {
    res.send('Route not found')
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})