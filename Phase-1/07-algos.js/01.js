// import readline from 'readline-sync'
const readline = require('readline-sync')
// let nums = [22, 34, 65, 76, 98, 104, 21]
// let target = 766

function linearSearch(arr, target) {
    if (!Array.isArray(arr)) return undefined

    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i])
        if (target == arr[i]) return i
        // else return -1
    }
    return -1
}
// let op = linearSearch(nums, target)
// console.log(op)


function test() {
    while (true) {
        console.log('1. Linear Search\n2. Exit')
        let choice = readline.questionInt('Enter your choice: ')

        switch (choice) {
            case 1:
                let size = readline.questionInt('Enter the size of the array: ')
                let arr = []

                for (let i = 0; i < size; i++) {
                    arr.push(readline.questionInt(`Enter the ${i} element: `))
                }
                let target = readline.questionInt('Enter the target value: ')
                let op = linearSearch(arr, target)
                if (op == -1) {
                    console.log('Element not found!')
                } else if (op == undefined) {
                    console.log('Please enter a valid array!')
                } else {
                    console.log('Element was found at ' + op)
                }
                break;
            case 2:
                return

            default:
                // break;
                // return

        }

    }
}
test()
// console.log(arr)