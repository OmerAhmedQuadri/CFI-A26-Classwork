import jwt from 'jsonwebtoken'

export const generateJWTToken = async (payload) => {
    try {
        const jwtToken = jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
        
        return jwtToken
    } catch (error) {
        console.log(error);
    }
}


export const validateJWTToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded.data
    } catch (error) {
        console.log(error);
    }
}