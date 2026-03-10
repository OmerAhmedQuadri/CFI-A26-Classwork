import express from 'express'
import fs from 'fs/promises'

const PORT = 3000
const app = express()

async function serverLog(req) {
    try {
        const logData = `\n${new Date().toLocaleString()} || ${req.method} ${req.url} ${req.socket.remoteAddress}`
        await fs.appendFile('./server.log', logData)
    } catch (error) {
        console.log('logging  error:', error);
    }
}

app.use(async (req, res, next) => {
    try {
        await serverLog(req)
        // console.log(req.url);
        next()
    } catch (error) {
        console.log('logging middleware error:', error);
        next()
    }

})

// app.use((req, res, next) => {
//     if (req.socket.remoteAddress == '::ffff:127.0.0.1') {
//         res.send({
//             status: false,
//             message: 'You are not allowed to use this application!',
//             data: null
//         })
//     }
//     else next()
// })

app.get('/', (req, res) => {
    res.send({
        'allowed operations': {
            add: '/add/n1/n2',
            sub: '/sub/n1/n2',
            mul: '/mul/n1/n2',
            div: '/div/n1/n2',
            mod: '/mod/n1/n2',
        }
    })
})

app.get('/add/:num1/:num2', (req, res) => {
    try {


        // console.log(req.url, req.method);
        const num1 = parseFloat(req.params.num1)
        const num2 = parseFloat(req.params.num2)

        if (Number.isNaN(num1) || Number.isNaN(num2)) {
            res.statusCode = 400
            res.send({
                status: false,
                message: 'Please enter a valid number',
                data: null
            })
            return
        }

        res.send({
            status: true,
            message: 'Operation success',
            data: num1 + num2
        })

    } catch (error) {
        res.send(error)
        // console.log(error);
    }
})

app.get('/sub/:num1/:num2', (req, res) => {
    try {
        const num1 = parseFloat(req.params.num1)
        const num2 = parseFloat(req.params.num2)

        if (Number.isNaN(num1) || Number.isNaN(num2)) {
            res.statusCode = 400
            res.send({
                status: false,
                message: 'Please enter a valid number',
                data: null
            })
            return
        }

        res.send({
            status: true,
            message: 'Operation success',
            data: num1 - num2
        })

    } catch (error) {
        res.send(error)
        // console.log(error);
    }
})

app.get('/mul/:num1/:num2', (req, res) => {
    try {
        const num1 = parseFloat(req.params.num1)
        const num2 = parseFloat(req.params.num2)

        if (Number.isNaN(num1) || Number.isNaN(num2)) {
            res.statusCode = 400
            res.send({
                status: false,
                message: 'Please enter a valid number',
                data: null
            })
            return
        }

        res.send({
            status: true,
            message: 'Operation success',
            data: num1 * num2
        })

    } catch (error) {
        res.send(error)
        // console.log(error);
    }
})

app.get('/div/:num1/:num2', (req, res) => {
    try {
        const num1 = parseFloat(req.params.num1)
        const num2 = parseFloat(req.params.num2)

        if (Number.isNaN(num1) || Number.isNaN(num2)) {
            res.statusCode = 400
            res.send({
                status: false,
                message: 'Please enter a valid number',
                data: null
            })
            return
        }
        if (num2 == 0) {
            res.status(400).send({
                status: false,
                message: 'Division by 0 is not possible',
                data: null
            })
            return
        }

        res.send({
            status: true,
            message: 'Operation success',
            data: num1 / num2
        })

    } catch (error) {
        res.send(error)
        // console.log(error);
    }
})

app.get('/mod/:num1/:num2', (req, res) => {
    try {
        const num1 = parseFloat(req.params.num1)
        const num2 = parseFloat(req.params.num2)

        if (Number.isNaN(num1) || Number.isNaN(num2)) {
            res.statusCode = 400
            res.send({
                status: false,
                message: 'Please enter a valid number',
                data: null
            })
            return
        }

        res.send({
            status: true,
            message: 'Operation success',
            data: num1 % num2
        })

    } catch (error) {
        res.send(error)
        // console.log(error);
    }
})


// valid routes are defined above this middleware
app.use((req, res) => {
    res.status(404).send({
        status: false,
        message: "Route not found, please check '/' for valid routes"
    })
})

app.listen(PORT, () => {
    console.log('Server is running at 3000');
})