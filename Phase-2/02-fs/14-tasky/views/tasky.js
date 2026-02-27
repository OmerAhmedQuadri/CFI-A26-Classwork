import { createTask, updateTask, deleteTask, printTasks } from "../controllers/tasks.controllers.js";
import rs from 'readline-sync'
async function tasky() {

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

export default tasky
