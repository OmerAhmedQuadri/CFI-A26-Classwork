function divide(a, b) {
    if (typeof a !== 'number' || typeof b != 'number'){
        console.error('Please enter a valid number')
        return
    }
    if (b==0){
        console.error('Cannot divide a number with zero')
        return
    } 

    return a/b
}

let result = divide(9,10)
console.log(result)

/*
    script.sh -> 12.js -> op.txt
               error|
                    v
                error.txt
*/