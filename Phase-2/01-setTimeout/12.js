import { questionInt } from "readline-sync";

let stopAt = questionInt('Enter the time for stopwatch in secs: ')

for (let i = 1; i <= stopAt; i++) {
    setTimeout(() => {
        console.log(i)
    }, i*1000)
}
