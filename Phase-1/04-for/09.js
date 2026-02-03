import readlineSync from 'readline-sync'

let rows = readlineSync.questionInt('Enter the number of rows: ')
let cols = readlineSync.questionInt('Enter the number of cols: ')

while (rows<=0 || cols<=0){
    console.log(rows, cols);
    rows = readlineSync.questionInt('Enter the number of rows (positive): ')
    cols = readlineSync.questionInt('Enter the number of cols (positive): ')
}
let matrix = Array(rows)

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = Array(cols)
    for (let j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = readlineSync.questionInt(`Enter the element of the matrix ${i+1},${j+1}: `)
        if(matrix[i][j]<0) {
            console.log('Please enter a positive number!')
            j--
        }
    }
}
console.log(matrix)

// let arr = Array(4)

// console.log(arr.length)