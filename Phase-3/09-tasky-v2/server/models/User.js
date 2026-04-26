import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    phone: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },

    status: {
        type: String,
        required: true,
        enum: ['active', 'disabled', 'banned'],
        default: 'active'
    },

    tokens: {
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
    },

    verified: {
        email: {
            type: Boolean,
            default: false
        },
        phone: {
            type: Boolean,
            default: true
        },
    },

    tasks: [
        {
            taskname: {
                type: String,
                required: true
            },
            deadline: {
                type: String,
                required: true
            },
            priority: {
                type: String,
                enum: ['low', 'medium', 'high'],
                default: 'medium'
            },
            isComplete: {
                type: Boolean,
                default: false
            }
        }
    ]
})

const User = mongoose.model('User', userSchema)

export default User