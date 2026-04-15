const expenseForm = document.getElementById('expense-form')

expenseForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(expenseForm)
    
    const expense = {
        expensename: formData.get('expensename'),
        amount: formData.get('amount')
    }
    console.log(expense);
})