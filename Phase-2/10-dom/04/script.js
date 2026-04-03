const plusBtn = document.querySelector('#plus-btn')
const minusBtn = document.querySelector('#minus-btn')
const counterDisplay = document.getElementById('counter-display')
// console.log(plusBtn);
// console.log(counterDisplay.innerText);

// plusBtn.addEventListener('click', plusCounter)
// minusBtn.addEventListener('click', minusCounter)
plusBtn.addEventListener('click', () => { updateCounter('+') })
minusBtn.addEventListener('click', () => { updateCounter('-') })

// function plusConter(){
//     counterDisplay.innerText = parseInt(counterDisplay.innerText) + 1
// }

// function minusCounter (){
//     counterDisplay.innerText = parseInt(counterDisplay.innerText) - 1
// }

function updateCounter(cal){
    const counter = parseInt(counterDisplay.innerText)
    if(cal=='+')
        counterDisplay.innerText = String(counter + 1).padStart(2, '0')
    else if(cal=='-'){
        if(counter != 0){
            counterDisplay.innerText = String(counter - 1).padStart(2, '0')
        }
    }
}