import User from '../models/User.js';

export const getUserTasksById = async (userId) => {
    return await User.findById(userId).select('tasks')
}