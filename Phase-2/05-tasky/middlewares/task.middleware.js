import { readDB } from "../models/Task.js"

const createTaskMiddleware = (req, res, next) => {
    const newTask = req.body
    if(!newTask.id || !newTask.task) return res.send('middleware says invalid data')
    next()

}

const updateTaskMiddleware = async (req, res, next) => {
    const {id, task, deadline, priority} = req.body
    // console.log(id, task, deadline, priority);
    if(!id) return res.json({status: false, message: 'ID not found'})

    if(!(deadline || task || priority)){
        return res.send('please enter atleast 1 param to be updated')
    }
    const taskList = await readDB()
    const taskIndex = taskList.findIndex(task => task.id == id)
    
    if(taskIndex==-1) return res.json({status: false, message: 'Task not found, Invalid ID'})
    
    req.taskIndex = taskIndex
    req.task = {
        task, deadline, priority
    }

    next()
    
}

export {createTaskMiddleware, updateTaskMiddleware}