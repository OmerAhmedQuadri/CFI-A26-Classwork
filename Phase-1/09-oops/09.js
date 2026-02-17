class MyArray {
    #_data = []

    constructor(){

    }

    print(){
        console.log(this.#_data)
    }

    get length () {
        return this.#_data.length
    }

    push(val){
        this.#_data[this.#_data.length] = val
    }

    pop() {
        this.#_data.pop()
    }
}

const nums = new MyArray()

nums.push(12)
nums.push(1)
nums.pop()
nums.print()
console.log(nums.length)
