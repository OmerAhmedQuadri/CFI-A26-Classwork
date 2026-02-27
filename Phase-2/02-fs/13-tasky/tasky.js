import fs from 'fs/promises'
import chalk from 'chalk'
import rs from 'readline-sync'

const db = './tasks.json'

async function dbInit() {
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


async function printTasks() {
    try {
        const tasks = await readDB()
        console.log('Tasks: ');
        console.log(tasks);
    } catch (error) {
        console.log('Error printing tasks: ', error);
    }
}
// printTasks()

async function createTask() {
    try {
        const tasks = await readDB()
        const newTask = {
            id: Date.now(),
            task: rs.question('Enter the task name: '),
            deadline: rs.question('Please enter the deadline (dd/mm/yyyy): '),
            priority: rs.question('Enter the priority (high/medium/low): ')
        }
        tasks.push(newTask)
        await writeDB(tasks)
        console.log('Task created successfully');

    } catch (error) {
        console.log('Error creating new task: ', error);
    }
}

async function updateTask(){
    try {
        const taskId = rs.questionInt('Please enter the task ID: ')
        const tasks = await readDB()
    
        const taskIndex = tasks.findIndex( t => t.id == taskId )
        if(taskIndex == -1){
            return console.log('task not found');
        }
        const newTask = {
            ...tasks[taskIndex],
            priority: rs.question('Please enter the new task priority (high/medium/low): '),
            deadline: rs.question('Please enter the new deadline for task (dd/mm/yyyy): ')
        }
        tasks[taskIndex] = newTask
        await writeDB(tasks)
        console.log('Task updated successfully');

    } catch (error) {
        console.log('Error updating tasks: ', error);
    }
}

async function deleteTask() {
    try {
        const tasks = await readDB()
        const taskId = rs.question('Please enter the task ID: ')

        const taskIndex = tasks.findIndex(t => t.id == taskId)
        if(taskIndex == -1){
            return console.log('Task not found');
        }
        tasks.splice(taskIndex, 1)
        await writeDB(tasks)
        console.log('Task deleted successfully');

    } catch (error) {
        console.log('Error deleting task: ', error);
    }
}


async function tasky() {

    await dbInit()

    while (true) {
        console.log('\n===Tasky===');
        console.log('1. Create task');
        console.log('2. Update task');
        console.log('3. Delete task');
        console.log('4. Print tasks');
        console.log('0. Exit');
        const choice = rs.questionInt('Please enter your choice: ')

        switch (choice) {
            case 1:
                await createTask()
                break;
            case 2:
                await updateTask()
                break;
            case 3:
                await deleteTask()
                break;
            case 4:
                await printTasks()
                break;
            case 0:
                return

            default:
                console.log('Invalid choice');
                break;
        }
    }
}

tasky()