import bcrypt from 'bcrypt'

const pass = 'codeforindia'

export const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 12)
    return hashedPassword
}

// console.log(await hashPassword(pass));

export const comparePassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword)
    return match
}

// console.log(await comparePassword(pass, `$2b$12$9rTXyd0xAVtrmqDZMGGRc.pc83en1X5DzTBhqWm2/MqdhIOK08qNu`));