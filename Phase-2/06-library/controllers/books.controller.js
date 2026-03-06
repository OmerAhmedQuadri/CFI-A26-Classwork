import { readDB, writeDB } from '../models/Book.js'

export const getAllBooks = async(req, res) => {
    const data = await readDB()
    res.json(data)
}


export const getBookById = async (req, res) => {
    const id = req.params.id

    const booksLib = await readDB()

    const book = booksLib.find(b => b.id == id)

    if(!book) return res.send('invalid id')

    res.send(book)
}

export const addBook = async (req, res) =>{
    // console.log(req.body);
    const newBook = req.body
    const booksLib = await readDB()

    booksLib.push(newBook)
    await writeDB(booksLib)

    res.send('book added sucessfully')
}