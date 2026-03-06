import fs from 'fs/promises'
const db = './db/books.json'

async function readDB() {
    try {
        const data = await fs.readFile(db, 'utf-8')
        // console.log(data);
        return JSON.parse(data)
        
    } catch (error) {
        console.log('Read DB error: ', error);
    }
}

async function writeDB(tasks) {
    try {
        const data = JSON.stringify(tasks, null, 4)
        await fs.writeFile(db, data)
    } catch (error) {
        console.log('Write DB error: ', error);
    }
}

export { readDB, writeDB }