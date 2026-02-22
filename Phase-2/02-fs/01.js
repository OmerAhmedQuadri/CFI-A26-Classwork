import fs from 'fs'

console.log('Start');

fs.readFile('file.txt', (error, data)=>{
    if(error) {
        console.log('Oops:');
        console.log(error);
        return
    }
    data = data.toString()
    console.log(data);

})

console.log('End');