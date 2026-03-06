import { readDB, writeDB } from "../models/Task.js"


const getAllTasks = async (req, res) => {
    const data = await readDB()
    res.json(data)
}

const getTaskById = async (req, res) => {
    const id = req.params.id
    const data = await readDB()

    const task = data.find((task) => task.id == id)
    if(!task) return res.json({status: false, message: 'task not found'})

    res.json({
        status: true, 
        message: 'task fetch successfully', 
        task: task
    })

}


const createTask = async (req, res) => {
    const tasks = await readDB()
    const newTask = req.body
    
    const index = tasks.findIndex(task => task.id == newTask.id)
    if(index != -1) return res.send('task already exists')
    // console.log(newTask);
    tasks.push(newTask)

    await writeDB(tasks)

    res.send('task created successfully')
}

const updateTask = async (req, res) => {
    const updatedTask = req.body
    const taskList = await readDB()

    const taskIndex = taskList.findIndex(task => task.id == updatedTask.id)

    if(taskIndex == -1) return res.send('Invalid task ID')
    
    // console.log(req.task);

    taskList[taskIndex] = updatedTask


    await writeDB(taskList)
    res.send('task updated successfully')
}

const deleteTask = async (req, res) => {
    const id = req.params.id

    const taskList = await readDB()

    const taskIndex = taskList.findIndex(ele => ele.id == id)

    if(-1 == taskIndex) return res.json({ status: false, message: 'task not found'})
    
    taskList.splice(taskIndex, 1)
    await writeDB(taskList)

    res.json({status: true, message: 'task deleted successfully'})

    
}

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask }