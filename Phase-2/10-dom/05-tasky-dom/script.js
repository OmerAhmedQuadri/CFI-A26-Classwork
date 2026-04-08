const inputBox = document.getElementById('input-box')
const submitBtn = document.getElementById('add-task-btn')
const taskListDisplay = document.getElementById('tasks-list')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []
renderTasks()

submitBtn.addEventListener('click', () => {
    let newTask = {
        taskId: Date.now(),
        taskname: inputBox.value,
        isCompleted: false
    }
    if (!newTask.taskname) return

    // const li = document.createElement('li')
    // const task = document.createElement('p')
    // const deleteBtn = document.createElement('button')
    // li.addEventListener('click', function () {
    //     this.classList.toggle('completed')
    // })
    // deleteBtn.addEventListener('click', function () {
    //     li.remove()
    //     tasks = tasks.filter(t => t.taskId != newTask.taskId)
    //     console.log(tasks);
    //     saveTasks()
    // })
    // deleteBtn.innerText = 'Delete'
    // task.innerText = newTask.taskname

    // li.append(task, deleteBtn)
    // taskListDisplay.append(li)

    tasks.push(newTask)
    renderTasks()
    saveTasks()
    inputBox.value = ''
})

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTasks() {
    taskListDisplay.innerHTML = ''
    if (tasks.length == 0) {
        taskListDisplay.innerText = 'Tasks not found'
        inputBox.focus()
        return
    }
    tasks.forEach((t )=> {
        const li = document.createElement('li')
        const task = document.createElement('p')
        const deleteBtn = document.createElement('button')

        task.innerText = t.taskname
        deleteBtn.innerText = 'Delete'
        
        li.addEventListener('click', function () {

            li.classList.toggle('completed')

            const index = tasks.findIndex((task) => task.taskId == t.taskId)
            tasks[index].isCompleted = !tasks[index].isCompleted

            saveTasks()
            // renderTasks()
        })
        deleteBtn.addEventListener('click', function () {
            li.remove()
            tasks = tasks.filter(task => task.taskId != t.taskId)
            // console.log(tasks);
            saveTasks()
        })


        if (t.isCompleted == true) li.classList.add('completed')

        li.append(task, deleteBtn)
        taskListDisplay.append(li)

    });
    inputBox.focus()
}