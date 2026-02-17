import { questionInt, question, questionFloat } from "readline-sync"

class Stack {
    #data = []
    #limit
    constructor(size = Infinity) {
        if (typeof (size) != 'number' || isNaN(size) || size < 2) {
            throw new Error('Please enter a valid queue size')
        }
        this.#limit = size
    }

    get height () {
        console.log('Current Height: '+this.#data.length)
        return this.#data.length
    }

    top() {
        if(this.#data.length==0) {
            console.log('Stack is empty!')
            return
        }
        console.log('Top:'+ this.#data[this.#data.length-1])
    }

    pop(){
        if(this.#data.length==0) {
            console.log('Stack is empty')
            return
        }
        return this.#data.pop()
    }

    push(val) {
        if(this.#data.length>=this.#limit) {
            console.log('Stack is full!')
            return
        }
        this.#data[this.#data.length] = val
    }

    print(){
        if(this.#data.length == 0){
            console.log('Stack is empty')
            return
        }
        console.log('Stack: ')
        // console.log(this.#data)
        for (let i = this.#data.length-1; i >= 0; i--) {

            console.log('| '+this.#data[i]+' |')
        }

    }

}


function createStack() {
    const size = questionInt('Enter the size of the stack: ')
    const stack = new Stack(size)

    while (true) {
        
        console.log('\n===Stack Operations===')
        console.log('1. Push')
        console.log('2. Pop')
        console.log('3. Top')
        console.log('4. Print')
        console.log('5. Height')
        console.log('6. Exit')

        const choice = questionInt('Enter your choice: ')

        switch (choice) {
            case 1:
                const ele = questionInt('Enter the element: ')
                stack.push(ele)
                break;
            case 2:
                const removed = stack.pop()
                if(removed != undefined) console.log('Removed element: '+removed)
                break;
            case 3:
                stack.top()
                break;
            case 4:
                stack.print()
                break;
            case 5:
                stack.height
                break;
            case 6:
                return
        
            default:
                break;
        }
        
    }
}

createStack()