import chalk from "chalk";
import axios from 'axios'
import rs from 'readline-sync'

const app = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    validateStatus: (status) => status < 500
})

const getAllTasks = async () => {
    try {
        const response = await app.get('/api/tasks')

        if (!response.data.success) {
            return console.log(chalk.redBright(response.data.message));
        }
        console.log(chalk.greenBright(response.data.message));
        console.log(response.data.data);
    } catch (error) {
        console.log(chalk.redBright(error));
    }
}

const getTaskById = async () => {
    try {
        const id = rs.question('Enter the task ID: ')
        if(!id) return console.log(chalk.redBright('Invalid id!'));
        const response = await app.get(`/api/tasks/${id}`)

        if (!response.data.success) {
            return console.log(chalk.redBright(response.data.message));
        }
        console.log(chalk.greenBright(response.data.message));
        console.log(response.data.data);
    } catch (error) {
        console.log(chalk.redBright(error.message));
    }
}

const getTaskByPriority = async () => {
    try {
        const priority = rs.question('Enter the task priority: ') || 'high'
        const response = await app.get(`/api/tasks/priority/${priority}`)

        if (!response.data.success) {
            return console.log(chalk.redBright(response.data.message));
        }
        console.log(chalk.greenBright(response.data.message));
        console.log(response.data.data);
    } catch (error) {
        console.log(chalk.redBright(error.message));
    }
}

const createTask = async () => {
    try {
        const task = rs.question('Enter the task name: ')
        const deadline = rs.question('Enter the task deadline: ')
        const priority = rs.question('Enter the task priority: ')

        const response = await app.post('/api/tasks/create',
            {
                task,
                deadline,
                priority
            }
        )
        if (!response.data.success) {
            return console.log(chalk.redBright(response.data.message));
        }
        console.log(chalk.greenBright(response.data.message));

    } catch (error) {
        console.log(chalk.redBright(error.message));
    }
}
const updateTask = async () => {
    try {
        const id = rs.question('Enter the task ID: ')
        const task = rs.question('Enter the task name: ')
        const deadline = rs.question('Enter the task deadline: ')
        const priority = rs.question('Enter the task priority: ')
        console.log(task, deadline, priority);
        const newTask = {
            id
        }
        if(task) newTask.task = task
        if(deadline) newTask.deadline = deadline
        if(priority) newTask.priority = priority
        const response = await app.put('/api/tasks/update', newTask)
        
        if (!response.data.success) {
            return console.log(chalk.redBright(response.data.message));
        }
        console.log(chalk.greenBright(response.data.message));

    } catch (error) {
        console.log(chalk.redBright(error.message));
    }
}

const deleteTask = async () => {
    try {
        const id = rs.question('Enter the task ID: ')
        const response = await app.delete(`/api/tasks/delete/${id}`)

        if (!response.data.success) {
            return console.log(chalk.redBright(response.data.message));
        }
        console.log(chalk.greenBright(response.data.message));
        console.log(response.data.data);    
    } catch (error) {
        console.log(chalk.redBright(error.message));
    }
}

export { getAllTasks, getTaskById, getTaskByPriority, createTask, updateTask, deleteTask }