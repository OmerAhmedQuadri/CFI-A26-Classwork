const tasks = ['task1', 'task2', 'task3']

let res

console.log('push - pop')
res = tasks.push('task4', 'task5')
console.log(res, tasks)

res = tasks.pop()
console.log(res, tasks)

console.log('\nshift - unshift')

res = tasks.shift()
console.log(res, tasks)

res = tasks.unshift('urgent-task')
console.log(res, tasks)