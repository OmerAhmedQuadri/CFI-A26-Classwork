import User from '../models/User.js'

export const getUserByEmail = async (email) => {
    return await User.findOne({ email }).select('-password -tokens -verified -tasks')
}

export const getUserById = async (id) => {
    return await User.findById(id).select('-password -tokens -verified -tasks')
}

