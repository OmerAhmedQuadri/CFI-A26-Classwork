

const sayHello = () =>  {
    console.log('Hello world')
    console.log('this is inside 2nd function')
}

// const func = sayHello
// func()

// console.log(sayHello())

function pleaseCallThis(func) {
    console.log('this is inside pleaseCallThis function')
    func('hello')
}

pleaseCallThis((ele) =>  {
    console.log('Hello world '+ele)
    // console.log('this is inside 2nd function')
})
pleaseCallThis(sayHello)

