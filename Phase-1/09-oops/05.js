class Animal {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    updateAge(age){
        this.age = age
        return this.age
    }
    getDetails(){
        console.log(`Name: ${this.name}\nAge: ${this.age}`)
    }
}

class Dog extends Animal{
    #sound = '---'
    constructor(name, age, breed, sound){
        super(name, age)
        this.breed = breed
        if(sound) this.#sound = sound
    }
    getDetails(){
        super.getDetails()
        console.log('Breed: '+this.breed)
    }
    sound (){
        console.log(this.name+' says '+this.#sound)
    }
}

const dog = new Dog('tommy', 5, 'golden retriver', 'woof')
console.log(dog)
dog.getDetails()
dog.sound()