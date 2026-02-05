
function isPrime (num){

    if (num<2) return false
    let prime = true

    for(let i = 2; i < num; i++){
        if(num%i==0){
            // console.log('not a prime number')
            prime = false
            break
        }
    }
    // console.log('it is a prime number')
    return prime
}

console.log(isPrime(24))
// for(let i = 0; i< 100; i++){
//     if(isPrime(i)) console.log(i)
// }
// isPrime(24)