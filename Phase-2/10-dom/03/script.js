const CODE_DISPLAY = document.getElementById('code-txt')
const redBtn = document.getElementById('red-btn')
// const blueBtn = document.getElementById('blue-btn')
// const greenBtn = document.getElementById('green-btn')
const statusBtn = document.getElementById('status-btn')

let counter = 0
redBtn.addEventListener('click', updateColour)
// blueBtn.addEventListener('click', updateColour)
// greenBtn.addEventListener('click', updateColour)
statusBtn.addEventListener('click', disableBtns)

function updateColour() {
    CODE_DISPLAY.style.color = 'red'
    console.log('udpate colour was executed '+ counter++);

    // return () => { console.log('returned function is executed');}
}


function disableBtns(){
    console.log('disableBtns was called');
    redBtn.removeEventListener('click', updateColour)
    redBtn.style.backgroundColor = 'rgb(255, 145, 145)'
    CODE_DISPLAY.style.color = 'black'
    statusBtn.innerText = 'Enable'
    // statusBtn.removeEventListener('click', disableBtns)
    // statusBtn.addEventListener('click', enableBtns)
}

function enableBtns(){
    console.log('enableBtns was called');

    redBtn.addEventListener('click', updateColour)
    CODE_DISPLAY.style.color = 'yellow'
    statusBtn.innerText = 'Disable'
    statusBtn.addEventListener('click', disableBtns)
    statusBtn.removeEventListener('click', enableBtns)
}

