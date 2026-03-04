import express from 'express'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hello world')
})
app.get('/users/:username', (req, res) => {
    // console.log(req.params.username);
    const {username} = req.params
    res.send({
        name: username,
        role: 'developer'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})