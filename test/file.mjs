import fs from 'fs/promises'

const add = async (num1, num2) => {

    const logData = `\nOperation: add, variables: ${num1} ${num2}`
    await fs.appendFile('./file.log', logData)

    const sum = num1 + num2
    return sum
}

const result = await add(10, 16)
console.log(result);