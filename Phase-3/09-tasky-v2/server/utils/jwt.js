import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateJWTToken = async (payload) => {
    try {
        const jwtToken = jwt.sign({ data: payload }, process.env.secret, { expiresIn: process.env.JWT_EXPIRY })
        return jwtToken
    } catch (error) {
        console.log(error);
    }
}
// const payload = {
//     id: 12345,
//     email: 'omer@code.in',
//     role: 'user'
// }

// const token = await generateJWTToken(payload)
// console.log(token);