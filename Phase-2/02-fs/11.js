import chalk from "chalk";
let rand = Math.random()
let success = rand > 0.5
console.log(rand);

console.log('Start');
let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(success){
            return resolve('Promise resolved successfully')
        }
        else {
            return reject('Failed to resolve promise')
        }
    }, 1000);
})

myPromise
    .then(result =>{
        console.log(chalk.greenBright(result));
    })
    .catch(error => {
        console.log(chalk.redBright(error));
    })

console.log('The end');