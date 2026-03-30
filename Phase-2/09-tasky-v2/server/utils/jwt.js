import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateJWTToken = async (payload) => {
    try {
        const jwtToken = jwt.sign({
            data: payload
        }, process.env.secret, { expiresIn: 120 })

        return jwtToken
    } catch (error) {
        console.log(error);
    }
}
