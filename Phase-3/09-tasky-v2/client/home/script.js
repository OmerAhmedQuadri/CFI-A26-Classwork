
const token = localStorage.getItem("token") || window.location.replace("/login");

const tasksTable = document.getElementById("tasks-table");
const selectBtn = document.getElementById("select-btn");
const addTaskBtn = document.getElementById("add-task-btn");
const addTaskForm = document.getElementById("add-task-form");
const addTaskActions = document.getElementById("add-task-actions");
const cancelTaskBtn = document.getElementById("cancel-task-btn");
const submitTaskBtn = document.getElementById("submit-task-btn");
const deleteSelectionBtn = document.getElementById("delete-selection-btn");
const markCompletedBtn = document.getElementById("mark-completed-btn");
const title = document.getElementById('title')
const messageBox = document.getElementById('message-box')
// // console.log(title);
// title.addEventListener('click', () => {
//     console.log('title clicked')
//     // window.location.href = '/home'
// });
console.log('home page');


markCompletedBtn.addEventListener("click", markSelectedTasksAsCompleted);
deleteSelectionBtn.addEventListener("click", deleteSelectedTasks);
submitTaskBtn.addEventListener("click", saveNewTask);
tasksTable.addEventListener("click", selectTasks)


selectBtn.addEventListener("click", () => {
    allowSelection = !allowSelection;
    if (!allowSelection) {
        selectedTasks.length = 0;
        Array.from(tasksTable.children).forEach(row => row.classList.remove("bg-blue-300"));
        selectBtn.textContent = "Select";
        markCompletedBtn.classList.add("hidden");
        deleteSelectionBtn.classList.add("hidden");
        addTaskBtn.classList.remove("hidden");
    } else {
        selectBtn.textContent = "Clear";
        markCompletedBtn.classList.remove("hidden");
        deleteSelectionBtn.classList.remove("hidden");
        addTaskBtn.classList.add("hidden");
    }
});
const selectedTasks = [];

addTaskBtn.addEventListener("click", addTask);
let tasks = [];
let allowSelection = false;

const app = axios.create({
    baseURL: "/api/tasks",
    headers: {
        'auth-token': token,
    },
    validateStatus: (status) => status < 500, // Resolve only if the status code is less than 500
})

fetchTasks();

async function fetchTasks() {
    try {

        document.getElementById('loading').classList.remove("hidden")
        const response = await app.get("/");
        if (!response.data.success) {
            // console.log(response);
            throw new Error(response.data.message);
        }
        tasks = response.data.data;
        renderTasks(tasks);
    } catch (error) {
        console.error(error);
    }
}

function renderTasks(tasks) {
    // console.log(tasks);
    tasksTable.innerHTML = "";
    document.getElementById('loading').classList.add("hidden")
    tasks.forEach((task, index) => {
        const row = document.createElement("tr");
        row.id = task._id;

        row.innerHTML = `
            <th class="border border-black text-start px-4 py-2">${index + 1}</th>
            <td class="border border-black text-start px-4 py-2">${task.taskname}</td>
            <td class="border border-black text-start px-4 py-2">${task.priority}</td>
            <td class="border border-black text-start px-4 py-2">${new Date(task.deadline).toLocaleString()}</td>
            <td class="border border-black text-start px-4 py-2">${task.isComplete}</td>
        `;
        tasksTable.appendChild(row);
    });
}

function addTask() {
    allowSelection = false
    addTaskActions.classList.remove("hidden");
    // addTaskForm.classList.remove("hidden");
    console.log('add task');

    const row = document.createElement("tr");;
    const maxDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString().slice(0, 16);
    // console.log('2026-05-15T23:59');
    console.log(maxDate);
    row.innerHTML = `
            <th class="border border-black text-start px-4 py-2">${tasks.length + 1}</th>
            <td class="border border-black text-start px-4 py-2"><input type="text" class="border border-gray-400 outline-none px-1"></td>
            <td class="border border-black text-start px-4 py-2"><select id="" class="border border-gray-400 outline-none">
                <option value="low">low</option>
                <option value="medium" selected>medium</option>
                <option value="high">high</option>
            </select></td>
            <td class="border border-black text-start px-4 py-2"><input type="datetime-local" max="${maxDate}"></td>
            <td class="border border-black text-start px-4 py-2 text-gray-600">false</td>
        `;
    tasksTable.appendChild(row);
    tasksTable.lastChild.children[1].children[0].focus();

    cancelTaskBtn.addEventListener("click", () => {
        addTaskActions.classList.add("hidden");
        // addTaskForm.classList.add("hidden");
        row.remove();
    });
}

async function saveNewTask(e) {
    e.preventDefault();
    const newTaskRow = tasksTable.lastChild;
    // console.log(newTaskRow);
    const taskname = newTaskRow.children[1].children[0].value;
    const priority = newTaskRow.children[2].children[0].value;
    const deadline = newTaskRow.children[3].children[0].value;
    // console.log(taskname, priority, deadline);

    try {
        const response = await app.post("/create", { taskname, priority, deadline, });
        if (!response.data.success) {
            displayMessage(response.data.message, 'error')
            throw new Error(response.data.message);
        }
        addTaskActions.classList.add("hidden");
        // addTaskForm.classList.add("hidden");
        newTaskRow.remove();
        fetchTasks();
        displayMessage(response.data.message, 'success');

    } catch (error) {
        displayMessage(error.message, 'error')
        console.error(error);
    }
}

function selectTasks(e) {
    e.preventDefault();
    if (!allowSelection) return;
    const row = e.target.closest("tr");
    if (!row) return;

    const taskId = row.id;

    if (selectedTasks.includes(taskId)) {
        selectedTasks.splice(selectedTasks.indexOf(taskId), 1);
        row.classList.remove("bg-blue-300");
    } else {
        selectedTasks.push(taskId);
        row.classList.add("bg-blue-300");
    }
    console.log(selectedTasks);
}

async function deleteSelectedTasks(e) {
    allowSelection = false
    e.preventDefault();
    console.log("deleting", selectedTasks);
    displayMessage('deleting...')
    selectedTasks.forEach(async (taskId, index) => {
        const interval = setTimeout(async () => {
            try {
                // console.log(taskId);
                const response = await app.delete(`/delete/${taskId}`);
                if (!response.data.success) {
                    console.log('error found: ');
                    console.log(response.data);
                    throw new Error(response.data.message);
                    displayMessage(response.data.message, 'error')
                }
                else {
                    displayMessage(response.data.message, 'success')
                }
                // selectedTasks.shift()
                // console.log(response.data);
                // await fetchTasks();
            } catch (error) {
                displayMessage(error.message, 'error')
                console.error(error);
            }
        }, index * 500);
    });
    setTimeout(async() => {
        await fetchTasks();
        allowSelection = true
        selectBtn.click()
        selectedTasks.length = 0;
    }, (selectedTasks.length+1) * 500);

}
async function markSelectedTasksAsCompleted(e) {
    allowSelection = false
    e.preventDefault();
    console.log("marking", selectedTasks);
    displayMessage('Marking tasks as completed', 'success')
    selectedTasks.forEach(async (taskId, index) => {
        const interval = setTimeout(async () => {
            try {
                // console.log(taskId);
                const response = await app.put(`/update-status/1/${taskId}`);
                if (!response.data.success) {
                    console.log('error found: ');
                    console.log(response.data);
                    throw new Error(response.data.message);
                    displayMessage(response.data.message, 'error')
                }
                else {
                    displayMessage(response.data.message, 'success')
                }
                // selectedTasks.shift()
                // console.log(response.data);
                // await fetchTasks();
            } catch (error) {
                displayMessage(error.message, 'error')
                console.error(error);
            }
        }, index * 500);
    });
    setTimeout(async() => {
        await fetchTasks();
        allowSelection = true
        selectBtn.click()
        selectedTasks.length = 0;
    }, (selectedTasks.length+1) * 500);

}



function displayMessage(message, type = 'success') {
    if (type === 'success') {
        messageBox.classList.remove('bg-red-300', 'text-red-700')
        messageBox.classList.add('bg-green-300', 'text-green-800')
    } else {
        messageBox.classList.remove('bg-green-300', 'text-green-800')
        messageBox.classList.add('bg-red-300', 'text-red-700')
    }
    messageBox.textContent = message
    messageBox.classList.remove('hidden')
    setTimeout(() => {
        messageBox.classList.add('hidden')
    }, 3000);
}



/* HTML: <div class="loader"></div> */
