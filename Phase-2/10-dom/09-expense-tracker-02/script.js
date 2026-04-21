const expenseForm = document.getElementById('expense-form')
const expenseListDisplay = document.getElementById('expense-list')
const totalExpenseDisplay = document.getElementById('total-expense')
const messageBox = document.getElementById('message-box')
let expenseList = JSON.parse(localStorage.getItem('expenses')) || []

messageBox.classList.add('hidden')

expenseForm.addEventListener('change', () => messageBox.classList.add('hidden'))
expenseForm.addEventListener('submit', addExpense)
expenseListDisplay.addEventListener('click', deleteExpense)

renderExpenses()

function addExpense(event) {

    event.preventDefault()

    const formData = new FormData(expenseForm)
    const expense = Object.fromEntries(formData.entries())

    const dateValidation = validateDate(expense.date)
    if(!dateValidation.success){
        messageBox.classList.remove('hidden')
        messageBox.textContent = dateValidation.message
        return
    }

    expense.id = Date.now()
    
    expenseList.push(expense)
    saveExpenses()
    renderExpenses()
    expenseForm.reset()
}

function validateDate(date){
    const givenDate = new Date(date)
    const now = new Date()

    if(isNaN(givenDate.getTime())){
        return {
            success: false,
            message: 'Invalid date'
        }
    }
    if(givenDate.getTime() > now.getTime()){
        return {
            success: false,
            message: 'Date cannot be in future'
        }
    }
    const minPastDate = new Date(now.getTime() - (1000 * 60 * 60 * 24 * 30))
    if(givenDate.getTime() < minPastDate){
        return {
            success: false,
            message: 'Date cannot be more than 30 days in past'
        }
    }
    else return {
            success: true,
        }

}

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenseList))
}

function renderExpenses () {
    expenseListDisplay.innerHTML = ''
    let totalAmount = 0
    expenseList.forEach(exp => {
        const li = document.createElement('li')
        li.innerHTML = `<div>
                        <strong>${exp.expensename}</strong>
                        <small>${exp.date}</small>
                    </div>
                    <span>$${exp.amount}</span>
                    <button id="${exp.id}">Delete</button>`
        totalAmount += parseFloat(exp.amount)
        expenseListDisplay.append(li)
    });
    totalExpenseDisplay.textContent = totalAmount.toFixed(2)
}


function deleteExpense(event) {

    if(event.target.tagName != 'BUTTON'){
        return
    }
    expenseList = expenseList.filter(exp => exp.id != event.target.id)
    saveExpenses()
    renderExpenses()
}



/*
get form values
    - submit event > get input values via individual html input tags
    - submit event > create new formDate obj via 'new FormData' class and access values via formDate.get('some-name')
    - submit event > create new formDate obj via 'new FormData' class and create an obj of all key val pairs by passing the 'formData.entries()' to 'Obj.fromentries()'

*/