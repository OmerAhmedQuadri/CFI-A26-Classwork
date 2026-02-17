import readline from 'readline-sync'
class Queue {
    #data = []
    #limit
    constructor(limit = Infinity) {

        if (typeof (limit) != 'number' || isNaN(limit) || limit < 2) {
            throw new Error('Please enter a valid queue limit')
        }
        this.#limit = limit

    }

    get limit() {
        console.log(this.#limit)
        return this.#limit
    }

    enQueue(ele) {
        if (this.#data.length >= this.#limit) return console.log('Queue is full')
        this.#data.push(ele)
    }

    deQueue() {
        if (this.#data.length == 0) return console.log('Queue is empty')
        return this.#data.shift()
    }

    get front() {
        if (this.#data.length == 0) return console.log('Queue is empty')
        console.log('Front: '+this.#data[0])
    }

    print() {
        if (this.#data.length == 0) {
            return console.log('Queue is empty')
        }
        console.log('Queue: ')
        console.log('Front--> '+this.#data.join(' '))
    }

}


function createQueue(){

    const size = readline.questionInt('Enter the size of your Queue: ')
    const myQueue = new Queue(size)
    console.log('Queue created successdfully!')
    
    while(true){
        console.log('\n====Queue Operations====')
        console.log('1. Enqueue')
        console.log('2. Dequeue')
        console.log('3. Front')
        console.log('4. Print')
        console.log('5. Exit')

        const choice = readline.questionInt('Enter your choice: ')

        switch (choice) {
            case 1:
                const ele = readline.questionInt('Enter the element to enqueue: ')
                myQueue.enQueue(ele)
                break;
            case 2:
                const removed = myQueue.deQueue()
                if(removed != undefined) console.log('Removed element: '+removed)
                break
            case 3:
                myQueue.front
                break
            case 4:
                myQueue.print()
                break
            case 5:
                return        
            default:
                break;
        }
    }
}

createQueue()