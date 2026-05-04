import User from '../models/user.model.js'
import { generateOtp } from '../utils/otp.utils.js'
import { hashPassword } from '../utils/bcrypt.utils.js'

export const createUser = async ({ fullname, email, password }) => {
    password = await hashPassword(password, 10)
    const user = new User({ fullname, email, password })
    user.authTokens.userRegisteration.otp = generateOtp()
    user.authTokens.userRegisteration.expires = new Date(Date.now() + 1 * 60 * 1000).toISOString()
    await user.save()
    return user
}


export const findUserByEmail = async (email) => {
    const user = await User.findOne({ email })
    return user
}

export const findUserByEmailAndDelete = async (email) => {
    const user = await User.findOneAndDelete({ email })
    return user
}