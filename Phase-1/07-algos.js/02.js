import readline from 'readline-sync'

function guessTheNumber () {
    let target = Math.floor(Math.random() * 100 + 1)
    // console.log(target)
    let attempts = 0

    while (true) {
        let guess = readline.questionInt('Enter you guess bn 1 and 100: ')
        attempts++
        if (target==guess){
            console.log('You won in '+attempts+' attempts')
            break
        } else if (guess > target) {
            console.log('lower')
        }
         else {
            console.log('higher')
        }
    }
}
guessTheNumber()