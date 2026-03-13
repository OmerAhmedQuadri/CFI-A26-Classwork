import rs from 'readline-sync'
import chalk from 'chalk'
import axios from 'axios'

class CLI {
    #BASE_URL = 'http://localhost:3000'
    constructor() {
        console.clear()
        this.selectedTask = null
        this.tasks = null
        this.app = axios.create({
            baseURL: this.#BASE_URL,
            timeout: 5000,
            validateStatus: (status) => status < 500
        })
    }

    async start() {
        this.OPTIONS = {
            1: this.getAllTasks.bind(this),
            2: this.getTaskByPriority.bind(this),
            3: this.createTask.bind(this),
            4: this.updateTask.bind(this),
            5: this.deleteTask.bind(this),
        }

        console.log('\n\n===TASKY===');
        console.log('1. All tasks');
        console.log('2. Tasks by priority');
        console.log('3. Create task');
        console.log('4. Update a task');
        console.log('5. Delete a task');
        console.log('0. Exit');
        const choice = rs.questionInt('Enter your choice: ')

        if (!choice) {
            console.log(chalk.redBright('Exiting...'));
            process.exit(0)
        }
        if (!this.OPTIONS[choice]) {
            console.log(chalk.redBright('Invalid Choice!'));
            return await this.start()
        }
        await this.OPTIONS[choice]()
        // await this.getAllTasks()
        // await this.printTasks()
        await this.start()
    }

    async getAllTasks() {
        try {
            const response = await this.app.get('/api/tasks')
            if (!response.data.success) {
                return console.log(chalk.redBright(response.data.message));
            }
            console.log(chalk.greenBright(response.data.message));
            this.tasks = response.data.data
            // console.log(this.tasks);
            await this.printTasks()
        } catch (error) {
            console.log(chalk.redBright(error));
        }
    }
    async getTaskByPriority() {
        try {
            const priority = rs.question('Enter the task priority: ') || 'high'
            const response = await this.app.get(`/api/tasks/priority/${priority}`)

            if (!response.data.success) {
                return console.log(chalk.redBright(response.data.message));
            }
            console.log(chalk.greenBright(response.data.message));
            this.tasks = response.data.data
            this.printTasks()
            // console.log(response.data.data);
        } catch (error) {
            console.log(chalk.redBright(error.message));
        }
    }

    async printTasks() {
        try {
            if (!this.tasks || this.tasks.length == 0) {
                return console.log(chalk.redBright('Tasks not found'));
            }
            console.log(chalk.blueBright('------------------------'));
            this.tasks.forEach((t, i) => {
                if (t._id == this.selectedTask) {
                    console.log(chalk.bgYellow('Task' + (i + 1) + ': ' + t.task));
                    console.log('Deadline: ' + t.deadline);
                    console.log('Priority: ' + t.priority);
                    console.log('Completed: ' + t.completed);
                    console.log(chalk.blueBright('------------------------'));
                } else {
                    console.log('Task' + (i + 1) + ': ' + t.task);
                    console.log('Deadline: ' + t.deadline);
                    console.log('Priority: ' + t.priority);
                    console.log('Completed: ' + t.completed);
                    console.log(chalk.blueBright('------------------------'));
                }
            });

            const choice = rs.keyInYN('Select a from above task?: ')
            if (choice) await this.selectATask()

        } catch (error) {
            console.log(chalk.redBright(error));
        }
    }

    async selectATask() {
        let index = rs.questionInt('Enter the task index: ')
        index--
        if (index < 0 || index >= this.tasks.length) {
            return console.log(chalk.redBright('Invalid index!'));
        }
        this.selectedTask = this.tasks[index]._id
        // console.log(this.selectedTask);
    }

    async createTask() {
        try {
            const task = rs.question('Enter the task name: ')
            const deadline = rs.question('Enter the task deadline: ')
            const priority = rs.question('Enter the task priority: ')

            const response = await this.app.post('/api/tasks/create',
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

    async updateTask() {
        try {
            if (!this.selectedTask) {
                console.log(chalk.redBright('Select a task first!'));
                return this.printTasks()
            }
            const t = this.tasks.find(t => t._id == this.selectedTask)
            console.log(chalk.bgYellow('Task: ' + t.task));
            console.log('Deadline: ' + t.deadline);
            console.log('Priority: ' + t.priority);
            console.log('Completed: ' + t.completed);
            console.log(chalk.blueBright('------------------------'));
            console.log('Enter the updated values below (ENTER to skip)');

            const task = rs.question('Enter the task name: ')
            const deadline = rs.question('Enter the task deadline: ')
            const priority = rs.question('Enter the task priority: ')

            // console.log(task, deadline, priority);
            const newTask = {
                id: this.selectedTask
            }
            if (task) newTask.task = task
            if (deadline) newTask.deadline = deadline
            if (priority) newTask.priority = priority

            const response = await this.app.put('/api/tasks/update', newTask)
            if (!response.data.success) {
                return console.log(chalk.redBright(response.data.message));
            }
            console.log(chalk.greenBright(response.data.message));

        } catch (error) {
            console.log(chalk.redBright(error.message));
        }
    }

    async deleteTask() {
        try {
            if (!this.selectedTask) {
                console.log(chalk.redBright('Select a task first!'));
                return this.printTasks()
            }
            const t = this.tasks.find(t => t._id == this.selectedTask)
            console.log(chalk.bgYellow('Task: ' + t.task));
            console.log('Deadline: ' + t.deadline);
            console.log('Priority: ' + t.priority);
            console.log('Completed: ' + t.completed);
            console.log(chalk.blueBright('------------------------'));
            // console.log('Enter the updated values below (ENTER to skip)');
            const choice = rs.keyInYN('Are you sure you want to delete the above task? ')

            if (!choice) return
            const response = await this.app.delete(`/api/tasks/delete/${this.selectedTask}`)

            if (!response.data.success) {
                return console.log(chalk.redBright(response.data.message));
            }
            console.log(chalk.greenBright(response.data.message));
            this.selectedTask = null

        } catch (error) {
            console.log(chalk.redBright(error.message));
        }
    }
}


export default CLI