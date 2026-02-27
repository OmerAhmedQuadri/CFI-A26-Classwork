import fs from 'fs/promises'

const db = './db/tasks.json'

async function dbInit() {
    // console.log('DBinit got executed');
    try {

        await fs.access(db)

        const tasks = await readDB()

        if(!Array.isArray(tasks)){
            console.log('DB corrupted, initializing new DB');
            await writeDB([])
        }
    } catch (error) {
        console.log('DB not found, initializing new DB');
        await writeDB([])
        await dbInit()
    }
}

await dbInit()

export async function readDB() {
    try {
        const data = await fs.readFile(db, 'utf-8')
        // console.log(data);

        return JSON.parse(data)
        
    } catch (error) {
        console.log('Read DB error: ', error);
    }
}

export async function writeDB(tasks) {
    try {
        const data = JSON.stringify(tasks, null, 4)
        await fs.writeFile(db, data)
    } catch (error) {
        console.log('Write DB error: ', error);
    }
}

