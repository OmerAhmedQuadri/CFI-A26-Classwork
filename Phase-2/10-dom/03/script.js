const CODE_DISPLAY = document.getElementById('code-txt')
const redBtn = document.getElementById('red-btn')
const blueBtn = document.getElementById('blue-btn')
const greenBtn = document.getElementById('green-btn')
const statusBtn = document.getElementById('status-btn')
const setColours = document.getElementById('set-colours')
let isEnabled = true

CODE_DISPLAY.style.color = localStorage.getItem('colour')

redBtn.addEventListener('click', () => {
    if (isEnabled) {
        CODE_DISPLAY.style.color = 'red'
        localStorage.setItem('colour', 'red')
    }
})
blueBtn.addEventListener('click', () => {
    if (isEnabled) {
        CODE_DISPLAY.style.color = 'blue'
        localStorage.setItem('colour', 'blue')
    }
})
greenBtn.addEventListener('click', () => {
    if (isEnabled) {
        CODE_DISPLAY.style.color = 'green'
        localStorage.setItem('colour', 'green')
    }
})

statusBtn.addEventListener('click', () => {
    if(isEnabled){
        isEnabled = false
        statusBtn.innerText = 'Enable'
        CODE_DISPLAY.style.color = 'yellow'

        redBtn.classList.add('disabled')
        blueBtn.classList.add('disabled')
        greenBtn.classList.add('disabled')
    }
    else {
        isEnabled = true
        statusBtn.innerText = 'Disable'
        
        redBtn.classList.remove('disabled')
        blueBtn.classList.remove('disabled')
        greenBtn.classList.remove('disabled')
    }
})