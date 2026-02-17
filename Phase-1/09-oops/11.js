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
        console.log(this.#data[0])
    }

    print() {
        if (this.#data.length == 0) {
            return console.log('Queue is empty')
        }
        console.log('Front--> '+this.#data.join(' '))
    }

}

const myQueue = new Queue(4)
// myQueue.print()
myQueue.deQueue()

myQueue.limit
myQueue.front
// console.log(myQueue.limit)
myQueue.enQueue(1)
myQueue.enQueue(11)
myQueue.enQueue(113)
myQueue.enQueue(13)
myQueue.enQueue(43)

myQueue.front
myQueue.print()
myQueue.deQueue()
myQueue.print()