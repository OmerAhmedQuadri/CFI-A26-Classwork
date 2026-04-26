document.addEventListener('DOMContentLoaded', () => {
    const Table = document.getElementById('game-table')
    const ResetBtn = document.getElementById('reset-btn')
    const scoreBoard = document.getElementById('score')

    let array = []
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
    const cells = {}
    // window.cells = {}
    let score = 100
    updateScore(score)

    const clickAudio = new Audio('./assets/click.mp3')
    const notAllowedAudio = new Audio('./assets/not-allowed.mp3')
    const winAudio = new Audio('./assets/win.mp3')
    const loseAudio = new Audio('./assets/lose.mp3')
    ResetBtn.addEventListener('click', () => window.location.href = './')

    for (let i = 1; i <= 100; i++) {
        array.push(i)
    }

    array.sort(() => Math.random() - 0.5)

    let count = 0
    for (let i = 1; i <= 10; i++) {
        const row = document.createElement('tr')
        for (let j = 1; j <= 10; j++) {
            const cellValue = array[count]
            const cell = document.createElement('td')
            // cell.setAttribute('data', cellValue)
            cell.addEventListener('click', clickHandler)
            // cell.textContent = array[count]
            cells[cellValue] = cell
            row.append(cell)
            count++
        }
        Table.append(row)
    }
    // console.log(cells);

    function findCellValue(targetCell) {
        for (const key in cells) {
            if (cells[key] == targetCell) {
                return parseInt(key)
            }
        }
    }

    function clickHandler(e) {
        clickAudio.play()
        updateScore(score - 1)
        const cellValue = findCellValue(e.target)
        // console.log(cellValue);
        validateClick(cellValue)
        // const cellValue = e.target.getAttribute('data')
        // console.log(cellValue);
    }

    function validateClick(cellValue) {
        if (cellValue == 1) {
            youWin()
        }
        else if (primes.includes(cellValue)) {
            youLose()
        }
        else {
            showMultiples(cellValue)
        }
    }

    function youLose() {
        updateScore(0)
        loseAudio.play()
        document.querySelectorAll('td').forEach(cell => {
            cell.style.backgroundColor = 'red'
            cell.style.color = '#FFD6A6'
            showMultiples(1)
        });
    }

    function youWin() {
        updateScore(score + 1)
        winAudio.play()
        // const cell = document.querySelector('[data="1"]')
        const cell = cells[1]
        cell.style.backgroundColor = 'black'
        cell.style.color = '#FFD6A6'
        showMultiples(1)
    }

    function showMultiples(cellValue) {
        // for (let i = 1; cellValue*i <= 100; i++) {
        //     const cell = document.querySelector(`[data="${cellValue*i}"]`)
        //     cell.textContent = cellValue*i
        //     cell.removeEventListener('click', clickHandler)
        //     cell.classList.add('not-allowed')
        //     cell.addEventListener('click', notAllowed)
        // }
        for (let i = 1; cellValue * i <= 100; i++) {
            cells[cellValue * i].textContent = cellValue * i
            cells[cellValue * i].removeEventListener('click', clickHandler)
            cells[cellValue * i].classList.add('not-allowed')
            cells[cellValue * i].addEventListener('click', notAllowed)
        }
    }

    function notAllowed(e) {
        notAllowedAudio.play()
    }

    function updateScore(newScore) {
        score = newScore
        scoreBoard.textContent = score
    }
})