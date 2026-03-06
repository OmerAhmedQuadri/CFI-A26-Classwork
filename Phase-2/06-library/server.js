import express from 'express'
import { addBook, getAllBooks, getBookById } from './controllers/books.controller.js'

const app = express()
const PORT = 3000

app.use(express.json())




app.get('/api/books', getAllBooks)

app.get('/api/books/:id', getBookById)

app.post('/api/add', addBook)



app.listen(PORT, () => {
    console.log('Server is running at '+PORT);
})







/*
    GET:
        get all books - /api/books
        get book by id - /api/books/:id

    POST:
        add a book - /api/add
         - id
         - title
         - author
         - price

    PUT:
        update a book - /api/update

    DELETE:
        delete a book - /api/delete/:id


*/