import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'pending'
    },
    authTokens: {
        userRegisteration: {
            otp: {
                type: String,
                required: true,
                default: 'null'
            },
            expires: {
                type: String,
                required: true,
                default: 'null'
            }
        },
        passwordReset: {
            otp: {
                type: String,
                required: true,
                default: 'null'
            },
            expires: {
                type: String,
                required: true,
                default: 'null'
            }
        }
    }
})

const User = mongoose.model('User', userSchema)

export default User