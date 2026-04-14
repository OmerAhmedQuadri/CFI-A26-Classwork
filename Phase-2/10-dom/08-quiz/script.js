const questions = [
    // C Language
    {
        question: "Who is known as the father of C language?",
        choice: ["Dennis Ritchie", "Brian Kernighan", "James Gosling", "Bjarne Stroustrup"],
        answer: "Dennis Ritchie"
    },
    {
        question: "What is the correct way to declare a pointer in C?",
        choice: ["int *ptr;", "int ptr;", "pointer int ptr;", "*int ptr;"],
        answer: "int *ptr;"
    },
    {
        question: "Which header file is required for using printf and scanf?",
        choice: ["<stdio.h>", "<conio.h>", "<stdlib.h>", "<string.h>"],
        answer: "<stdio.h>"
    },
]

let currentQuestionIndex = 0
let score = 0
let thisChoice = 0

// question container
let QuestionContainer = document.getElementById('question-container')
let QuestionText = document.getElementById('question-text')
let ChoiceList = document.getElementById('choice-list')
let NextBtn = document.getElementById('next-btn')

// result container
let ResultContainer = document.getElementById('result-container')
let ScoreDisplay = document.getElementById('score')
let RestartBtn = document.getElementById('restart-btn')

// home
let StartBtn = document.getElementById('start-btn')

StartBtn.addEventListener('click', startQuiz)
RestartBtn.addEventListener('click', restartQuiz)
NextBtn.addEventListener('click', nextQuestion)

function restartQuiz() {
    score = 0
    currentQuestionIndex = 0
    // ResultContainer.classList.add('hidden')
    // QuestionContainer.classList.remove('hidden')
    NextBtn.textContent = 'Next Question'
    startQuiz()
}

function startQuiz() {
    // hide result container, show question container
    ResultContainer.classList.add('hidden')
    StartBtn.classList.add('hidden')
    QuestionContainer.classList.remove('hidden')

    // render questions
    showQuestion()
}

function showQuestion() {

    // QuestionText.textContent = questions[currentQuestionIndex].question
    QuestionText.textContent = `${currentQuestionIndex + 1}. ${questions[currentQuestionIndex].question}`

    // show options
    questions[currentQuestionIndex].choice.forEach((opt) => {
        const li = document.createElement('li')
        li.textContent = opt
        li.addEventListener('click', (event) => { selectAnswer(event) })
        ChoiceList.append(li)
    })

}

function nextQuestion() {
    if (thisChoice == questions[currentQuestionIndex].answer) score++

    QuestionText.textContent = ''
    ChoiceList.innerHTML = ''
    NextBtn.classList.add('hidden')

    currentQuestionIndex++
    if (currentQuestionIndex == questions.length - 1) NextBtn.textContent = 'Submit'

    // show question
    if (currentQuestionIndex == questions.length) return showResult()

    showQuestion()
}

function selectAnswer(event) {
    clearSelection()
    event.target.classList.add('selected')
    NextBtn.classList.remove('hidden')
    thisChoice = event.target.textContent
}

function clearSelection() {
    const list = document.querySelectorAll('li')
    // console.log(list)
    list.forEach(item => item.classList.remove('selected'))
}

function showResult() {
    QuestionContainer.classList.add('hidden')
    ResultContainer.classList.remove('hidden')
    ScoreDisplay.textContent = `${score} of ${questions.length}`
}