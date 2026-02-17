class Stack {
    #data = []
    height = 0
    limit = 5
    constructor() {

    }

    top() {
        if(this.height==0) {
            console.log('Stack is empty')
            return
        }
        console.log('Top:')
        console.log(this.#data[this.height-1])
    }

    pop(){
        if(this.height==0) {
            console.log('Stack is empty')
            return
        }
        this.height--
        return this.#data.pop()
    }

    push(val) {
        if(this.height>this.limit) {
            console.log('Stack is full!')
            return
        }
        this.#data[this.height] = val
        this.height++
    }

    print(){
        if(this.height == 0){
            console.log('Stack is empty')
            return
        }
        console.log('Stack: ')
        // console.log(this.#data)
        for (let i = this.height-1; i >= 0; i--) {

            console.log('| '+this.#data[i]+' |')
        }

    }

}

const stack = new Stack()
stack.top()
stack.push(10)
stack.top()
stack.print()
// stack.print()
stack.push(20)
stack.push(50)
stack.push(44)
stack.push(65)
stack.push(65)
stack.push(65)  
// stack.print()
stack.pop()
stack.print()

