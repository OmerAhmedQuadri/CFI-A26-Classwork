import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        unique: true
    },
    deadline: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
        enum: ['high', 'medium', 'low'],
        default: 'medium',
    },
    createdAt: {
        type: String,
        required: true,
        default: new Date().toLocaleString()
    },
    updatedAt: {
        type: String,
        required: true,
        default: new Date().toLocaleString()
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
})

const Task = mongoose.model('Task', taskSchema)
export default Task