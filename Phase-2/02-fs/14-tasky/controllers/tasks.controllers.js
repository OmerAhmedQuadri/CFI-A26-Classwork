import chalk from 'chalk'
import rs from 'readline-sync'
import { readDB, writeDB } from '../models/Task.js';

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

export { createTask, updateTask, deleteTask, printTasks }