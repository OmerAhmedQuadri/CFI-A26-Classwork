const ExpenseForm = document.getElementById('expense-form')
const messageBox = document.getElementById('message-box')
const totalAmountDisplay = document.querySelector('[id="amount-display"]')

const expenseListDisplay = document.getElementById('expense-list')

let expenseList = JSON.parse(localStorage.getItem('expenseList')) || []
// console.log(expenseList);

renderExpenses()

ExpenseForm.addEventListener('change', () => messageBox.classList.add('hidden'))
ExpenseForm.addEventListener('submit', addExpense)

expenseListDisplay.addEventListener('click', deleteExpense)

function deleteExpense(event) {
    event.preventDefault()
    if(event.target.tagName != 'BUTTON'){
        return
    }

    const id = event.target.id
    console.log(id);

    expenseList = expenseList.filter((exp) => exp.id != id)

    saveExpenses()
    renderExpenses()
}


function addExpense(event) {
    event.preventDefault()
    const formData = new FormData(ExpenseForm)

    if (!validateDate(formData.get('date'))) return

    const expense = {
        id: Date.now(),
        expenseName: formData.get('expensename'),
        amount: formData.get('amount'),
        date: formData.get('date')
    }
    console.log(expense);
    expenseList.push(expense)
    ExpenseForm.reset()
    saveExpenses()
    renderExpenses()

}

function saveExpenses() {
    localStorage.setItem('expenseList', JSON.stringify(expenseList))
}

function renderExpenses() {
    let totalAmount = 0
    expenseListDisplay.innerHTML = ''
    expenseList.forEach(expense => {
        totalAmount += parseFloat(expense.amount)
        const li = document.createElement('li')
        // <small>${expense.date}</small>
        li.innerHTML = `<div>
                <strong>${expense.expenseName}</strong>
                <small>${new Date(expense.date).toLocaleDateString()}</small>
                    </div>
                    <span>$${expense.amount}</span>
                    <button id="${expense.id}">Delete</button>
        `
        expenseListDisplay.append(li)
    });

    totalAmountDisplay.textContent = totalAmount
}




function validateDate(date) {
    // todo
    return true
}

function showMessage(message) {
    messageBox.classList.remove('hidden')
    messageBox.innerText = message
}