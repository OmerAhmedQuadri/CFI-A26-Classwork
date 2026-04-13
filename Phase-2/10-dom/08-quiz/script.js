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

}

function startQuiz() {

}

function showQuestion() {

}

function nextQuestion() {

}

function selectAnswer(event) {

}

function clearSelection() {

}

function showResult() {

}